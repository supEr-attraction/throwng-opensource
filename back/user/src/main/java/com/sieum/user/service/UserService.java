package com.sieum.user.service;

import static com.sieum.user.common.CustomExceptionStatus.*;

import com.sieum.user.controller.feign.MusicFeignClient;
import com.sieum.user.controller.feign.NotificationFeignClient;
import com.sieum.user.controller.feign.QuizFeignClient;
import com.sieum.user.domain.Level;
import com.sieum.user.domain.LevelHistory;
import com.sieum.user.domain.User;
import com.sieum.user.domain.UserHistory;
import com.sieum.user.domain.enums.ExperiencePointType;
import com.sieum.user.dto.request.*;
import com.sieum.user.dto.response.*;
import com.sieum.user.exception.AuthException;
import com.sieum.user.exception.BadRequestException;
import com.sieum.user.exception.FeignClientException;
import com.sieum.user.repository.LevelHistoryRepository;
import com.sieum.user.repository.LevelRepository;
import com.sieum.user.repository.UserHistoryRepository;
import com.sieum.user.repository.UserRepository;
import com.sieum.user.util.RedisUtil;
import feign.FeignException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final MusicFeignClient musicFeignClient;
    private final LoginService loginService;
    private final QuizFeignClient quizFeignClient;
    private final NotificationFeignClient notificationFeignClient;
    private final LevelHistoryRepository levelHistoryRepository;
    private final RedisUtil redisUtil;
    private final LevelRepository levelRepository;
    private final UserHistoryRepository userHistoryRepository;

    private final String THROWNG = "THROWNG";
    private final String PICKUP = "PICKUP";
    private final int INITIAL_STATUS = 0;
    private final int PLUS_NUMBER = 1;
    private final int PERCENTAGE = 100;
    private final String CONTENTS = "CONTENTS";

    public UserInfoResponse getUserLevel(long userId) {
        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new AuthException(NOT_FOUND_ACCOUNT));

        LevelHistory levelHistory =
                levelHistoryRepository.findTopByUserIdOrderByCreatedAtDesc(userId);

        if (levelHistory == null) {
            throw new BadRequestException(NOT_FOUND_LEVEL_HISTORY_ID);
        }

        return UserInfoResponse.of(
                user,
                levelHistory.getLevel().getGrade(),
                calculateExp(
                        levelHistory,
                        getExperienceCountByRedis(
                                levelHistory.getLevel().getGrade(),
                                userId,
                                levelHistory.getCreatedAt())));
    }

    public UserLevelInfoResponse getLimitAccount(long userId) {
        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new AuthException(NOT_FOUND_ACCOUNT));

        LevelHistory levelHistory =
                levelHistoryRepository.findTopByUserIdOrderByCreatedAtDesc(user.getId());

        if (levelHistory == null) {
            throw new BadRequestException(NOT_FOUND_LEVEL_HISTORY_ID);
        }

        if (!user.getViolation().equals("NONE")) {
            throw new AuthException(VIOLATE_ACCOUNT);
        }

        return UserLevelInfoResponse.of(userId, levelHistory.getLevel().getThrowngLimit());
    }

    public int getUserLevelInfo(long userId) {
        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new AuthException(NOT_FOUND_ACCOUNT));

        LevelHistory levelHistory =
                levelHistoryRepository.findTopByUserIdOrderByCreatedAtDesc(user.getId());

        if (levelHistory == null) {
            throw new BadRequestException(NOT_FOUND_LEVEL_HISTORY_ID);
        }

        return levelHistory.getLevel().getThrowngLimit();
    }

    public List<ThrownSongResponse> getThrownSong(final long userId) {
        return musicFeignClient.getThrwonSong(userId);
    }

    public List<PickedUpSongResponse> getPickedUpSong(final long userId) {
        return musicFeignClient.getPickedUpSong(userId);
    }

    public void createUserFcmToken(
            final String accessToken, final FcmTokenRequest fcmTokenRequest) {
        final long userId = loginService.getUsername(accessToken);
        final User user = userRepository.findById(userId).get();
        user.setFcmToken(fcmTokenRequest.getFcmToken());
        userRepository.save(user);
    }

    public List<UserFcmInfoResponse> getUserFcmList() {
        return userRepository.findByFcmTokenIsNotNull().stream()
                .map(
                        user ->
                                UserFcmInfoResponse.builder()
                                        .fcmToken(user.getFcmToken())
                                        .userId(user.getId())
                                        .build())
                .collect(Collectors.toList());
    }

    public List<CouponeInquiryResponse> getUserCouponHistory(final long userId) {
        return quizFeignClient.getCouponHistory(userId);
    }

    public void modifyNickName(
            final long userId, final CouponNickNameRequest couponNickNameRequest) {
        // ValidVating Coupon
        CouponValidationRequest couponValidationRequest =
                CouponValidationRequest.of(
                        userId,
                        couponNickNameRequest.getCouponId(),
                        couponNickNameRequest.getCouponType());

        try {
            if (quizFeignClient.validateCoupon(couponValidationRequest)) {
                final User user =
                        userRepository
                                .findById(userId)
                                .orElseThrow(
                                        () -> new BadRequestException(NOT_AUTHENTICATED_ACCOUNT));

                user.updateNickName(couponNickNameRequest.getNickName());
                quizFeignClient.modifyCouponStatus(CouponStatusRequest.of(couponValidationRequest));
            }
        } catch (FeignException feignException) {
            throw new FeignClientException(NOT_USE_COUPON_FROM_FEIGN);
        }
    }

    public String getUserFcmToken(final long userId) {
        return userRepository.findById(userId).get().getFcmToken();
    }

    public void upgradeExperiencePoint(UpdateExperiencePointRequest updateExperiencePointRequest) {
        LevelHistory levelHistory =
                levelHistoryRepository.findTopByUserIdOrderByCreatedAtDesc(
                        updateExperiencePointRequest.getUserId());

        if (levelHistory == null) {
            throw new BadRequestException(NOT_FOUND_LEVEL_HISTORY_ID);
        }

        User user =
                userRepository
                        .findById(updateExperiencePointRequest.getUserId())
                        .orElseThrow(() -> new BadRequestException(NOT_FOUND_ACCOUNT));

        // Get total experience-point using a redis-key
        final String key =
                "user_exp_"
                        + levelHistory.getLevel().getGrade()
                        + "_"
                        + updateExperiencePointRequest.getUserId();
        final Object value = redisUtil.getData(key);

        long expCount = 0;
        if (value == null) {
            // Not stored in redis : Get history since the last upgraded date
            //            MusicExperienceCountResponse musicExperienceCountResponse
            //                    =
            // getMusicExperienceCount(updateExperiencePointRequest.getUserId(),
            //                    levelHistory.getCreatedAt());
            //                    musicFeignClient.getMusicExperienceCount(
            //                            MusicExperienceCountRequest.of(
            //                                    updateExperiencePointRequest.getUserId(),
            //                                    levelHistory.getCreatedAt()));
            //            expCount =
            //                    musicExperienceCountResponse.getThrowngCount()
            //                                    * ExperiencePointType.valueOf(THROWNG).getPoint()
            //                            + musicExperienceCountResponse.getPickedupCount()
            //                                    * ExperiencePointType.valueOf(PICKUP).getPoint();

            expCount =
                    getMusicExperienceCount(
                            updateExperiencePointRequest.getUserId(), levelHistory.getCreatedAt());
        } else {
            expCount = Long.valueOf((String) value);
        }

        // Calculating experience-point by type
        expCount += ExperiencePointType.valueOf(updateExperiencePointRequest.getType()).getPoint();

        if (expCount >= levelHistory.getLevel().getNextPoint()) {
            // Leveled up
            Level level =
                    levelRepository.findByGrade(levelHistory.getLevel().getGrade() + PLUS_NUMBER);

            if (level == null) {
                throw new BadRequestException(NOT_FOUND_LEVEL_ID);
            }

            levelHistoryRepository.save(LevelHistory.builder().user(user).level(level).build());

            expCount = INITIAL_STATUS;
            // Delete redis corresponding to the current key
            redisUtil.deleteData(key);

            //            final String upKey = "user_exp_" +level.getGrade()
            //                    + "_"+updateExperiencePointRequest.getUserId();
            //            redisUtil.setData(upKey, String.valueOf(expCount));

            // Delete the throwng count in redis
            final String nowDate =
                    LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
            final String currentKey =
                    "user_throw_" + updateExperiencePointRequest.getUserId() + "_" + nowDate;

            if (redisUtil.getData(currentKey) != null) {
                redisUtil.deleteData(currentKey);
            }

        } else {
            redisUtil.setData(key, String.valueOf(expCount));
        }
    }

    public long getMusicExperienceCount(final long userId, final LocalDateTime createAt) {
        MusicExperienceCountResponse musicExperienceCountResponse =
                musicFeignClient.getMusicExperienceCount(
                        MusicExperienceCountRequest.of(userId, createAt));

        //        ContentExperienceCountResponse contentExperienceCountResponse =
        //                quizFeignClient.getQuizExperienceCount(
        //                        MusicExperienceCountRequest.of(userId, createAt));

        return (musicExperienceCountResponse.getThrowngCount()
                        * ExperiencePointType.valueOf(THROWNG).getPoint()
                + musicExperienceCountResponse.getPickedupCount()
                        * ExperiencePointType.valueOf(PICKUP).getPoint());
        //                + contentExperienceCountResponse.getContentCount()
        //                        * ExperiencePointType.valueOf(CONTENTS).getPoint());
    }

    public long getExperienceCountByRedis(
            final int grade, final long userId, final LocalDateTime createdAt) {
        final String key = "user_exp_" + grade + "_" + userId;
        final Object value = redisUtil.getData(key);

        long expCount = 0;
        if (value == null) {
            expCount = getMusicExperienceCount(userId, createdAt);
            if (expCount != 0) {
                redisUtil.setData(key, String.valueOf(expCount));
            }
        } else {
            expCount = Long.valueOf((String) value);
        }

        return expCount;
    }

    public int calculateExp(final LevelHistory levelHistory, final long exp) {
        return (int)
                Math.floor(
                        (((double) exp / (double) levelHistory.getLevel().getNextPoint()))
                                * PERCENTAGE);
    }

    public void createUserHistory(final String ip, final User user) {
        userHistoryRepository.save(UserHistory.builder().ip(ip).user(user).build());
    }

    public List<NotificationHistoryResponse> getUserNotificationHistory(final long userId) {
        return notificationFeignClient.getUserNotificationHistory(userId);
    }

    public int getLevelThrowngCount(final long userId) {
        LevelHistory levelHistory =
                levelHistoryRepository.findTopByUserIdOrderByCreatedAtDesc(userId);

        if (levelHistory == null) {
            throw new BadRequestException(NOT_FOUND_LEVEL_HISTORY_ID);
        }

        return levelHistory.getLevel().getThrowngLimit();
    }

    public void useCoupon(final long userId, final UseCouponInfoRequest useCouponInfoRequest) {
        CouponValidationRequest couponValidationRequest =
                CouponValidationRequest.of(
                        userId,
                        useCouponInfoRequest.getCouponId(),
                        useCouponInfoRequest.getCouponType());

        try {
            quizFeignClient.validateCoupon(couponValidationRequest);
        } catch (FeignException feignException) {
            throw new FeignClientException(NOT_USE_COUPON_FROM_FEIGN);
        }
    }
}
