package com.sieum.user.service;

import static com.sieum.user.common.CustomExceptionStatus.NOT_FOUND_ACCOUNT;
import static com.sieum.user.common.CustomExceptionStatus.VIOLATE_ACCOUNT;

import com.sieum.user.controller.feign.MusicFeignClient;
import com.sieum.user.domain.User;
import com.sieum.user.dto.response.PickedUpSongResponse;
import com.sieum.user.dto.response.ThrownSongResponse;
import com.sieum.user.dto.response.UserInfoResponse;
import com.sieum.user.dto.response.UserLevelInfoResponse;
import com.sieum.user.exception.AuthException;
import com.sieum.user.repository.UserRepository;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final MusicFeignClient musicFeignClient;

    public UserInfoResponse getUserLevel(long userId) {
        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new AuthException(NOT_FOUND_ACCOUNT));

        return UserInfoResponse.of(
                user,
                musicFeignClient.countThrownSong(userId),
                musicFeignClient.countPickUpSong(userId));
    }

    public UserLevelInfoResponse getLimitAccount(long userId) {
        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new AuthException(NOT_FOUND_ACCOUNT));

        if (!user.getViolation().equals("NONE")) {
            throw new AuthException(VIOLATE_ACCOUNT);
        }

        int count = 0;
        if (user.getLevel().equals("EARPHONES")) {
            count = 4;
        } else if (user.getLevel().equals("BUDS")) {
            count = 6;
        } else if (user.getLevel().equals("BUDS_PRO")) {
            count = 10;
        } else if (user.getLevel().equals("VVIP")) {
            count = 1000;
        }

        return UserLevelInfoResponse.of(userId, count);
    }

    public int getUserLevelInfo(long userId) {
        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new AuthException(NOT_FOUND_ACCOUNT));
        int count = 0;
        if (user.getLevel().equals("EARPHONES")) {
            count = 4;
        } else if (user.getLevel().equals("BUDS")) {
            count = 6;
        } else if (user.getLevel().equals("BUDS_PRO")) {
            count = 10;
        } else if (user.getLevel().equals("VVIP")) {
            count = 1000;
        }
        return count;
    }

    public List<ThrownSongResponse> getThrownSong(final long userId) {
        return musicFeignClient.getThrwonSong(userId);
    }

    public List<PickedUpSongResponse> getPickedUpSong(final long userId) {
        return musicFeignClient.getPickedUpSong(userId);
    }
}
