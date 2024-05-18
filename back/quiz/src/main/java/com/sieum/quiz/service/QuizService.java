package com.sieum.quiz.service;

import static com.sieum.quiz.exception.CustomExceptionStatus.INVALID_QUIZ_ID;

import com.sieum.quiz.controller.feign.MusicAuthClient;
import com.sieum.quiz.controller.feign.UserAuthClient;
import com.sieum.quiz.domain.Quiz;
import com.sieum.quiz.domain.QuizHistory;
import com.sieum.quiz.domain.enums.CouponRoute;
import com.sieum.quiz.domain.enums.QuizType;
import com.sieum.quiz.dto.request.GameHistoryCreationRequest;
import com.sieum.quiz.dto.request.QuizExperienceCountRequest;
import com.sieum.quiz.dto.request.QuizHistoryCreationRequest;
import com.sieum.quiz.dto.request.UpdateExperiencePointRequest;
import com.sieum.quiz.dto.response.*;
import com.sieum.quiz.exception.BadRequestException;
import com.sieum.quiz.repository.CouponReposistory;
import com.sieum.quiz.repository.QuizHistoryQueryDSLRepository;
import com.sieum.quiz.repository.QuizHistoryRepository;
import com.sieum.quiz.repository.QuizRepository;
import com.sieum.quiz.util.RedisUtil;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final String CONTENT_TYPE = "CONTENTS";
    private final RedisUtil redisUtil;
    private final UserAuthClient userAuthClient;
    private final MusicAuthClient musicAuthClient;
    private final CouponReposistory couponRepository;
    private final QuizRepository quizRepository;
    private final QuizHistoryRepository quizHistoryRepository;
    private final QuizHistoryQueryDSLRepository quizHistoryQueryDSLRepository;

    public List<CouponIssuanceStatusResponse> getCouponIssuanceStatus(final long userId) {

        return EnumSet.allOf(CouponRoute.class).stream()
                .map(
                        route -> {
                            boolean result;
                            if (route.getName().equals("quiz")) {
                                result =
                                        quizHistoryRepository.existsByCreatedAtAfterAndUserId(
                                                LocalDate.now().atStartOfDay(), userId);
                            } else {
                                result =
                                        couponRepository.existsByCreatedAtAfterAndRouteAndUserId(
                                                LocalDate.now().atStartOfDay(),
                                                CouponRoute.findByName(String.valueOf(route)),
                                                userId);
                            }
                            return CouponIssuanceStatusResponse.builder()
                                    .status(result)
                                    .name(route.getName())
                                    .build();
                        })
                .collect(Collectors.toList());
    }

    public QuizResultResponse createQuizHistory(
            final long userId, final QuizHistoryCreationRequest quizHistoryCreationRequest) {

        final Optional<Quiz> quiz = quizRepository.findById(quizHistoryCreationRequest.getQuizId());
        if (quiz.isEmpty()) {
            throw new BadRequestException(INVALID_QUIZ_ID);
        }

        final String answer =
                quizRepository.findById(quizHistoryCreationRequest.getQuizId()).get().getAnswer();
        final QuizResultResponse quizResultResponse;

        if (quizHistoryCreationRequest.getSubmit() != null
                && answer.toLowerCase()
                        .replaceAll(" ", "")
                        .equals(
                                quizHistoryCreationRequest
                                        .getSubmit()
                                        .toLowerCase()
                                        .replaceAll(" ", ""))) {
            quizResultResponse = QuizResultResponse.builder().status(true).build();
        } else {
            quizResultResponse = QuizResultResponse.builder().status(false).build();
        }

        if (!quizHistoryRepository.existsByCreatedAtAfterAndUserId(
                LocalDate.now().atStartOfDay(), userId)) {
            userAuthClient.upgradeExperiencePoint(
                    UpdateExperiencePointRequest.of(userId, CONTENT_TYPE));
        }

        quizHistoryRepository.save(
                QuizHistory.builder()
                        .quiz(quiz.get())
                        .submit(quizHistoryCreationRequest.getSubmit())
                        .result(quizResultResponse.isStatus())
                        .userId(userId)
                        .build());

        return quizResultResponse;
    }

    public long getCurrentUserId(final String authorization) {
        return userAuthClient.getUserId(authorization);
    }

    public List<QuizResponse> getQuizList() {

        final String key =
                "quiz_" + LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        if (redisUtil.getObject(key) != null) {
            return (List<QuizResponse>) redisUtil.getObject(key);
        }

        final List<QuizResponse> quizlist =
                quizRepository.findAll().stream()
                        .map(
                                quiz ->
                                        QuizResponse.builder()
                                                .quizId(quiz.getId())
                                                .question(quiz.getQuestion())
                                                .quizType(
                                                        QuizType.valueOf(quiz.getQuizType())
                                                                .getValue())
                                                .quizImage(quiz.getQuizImage())
                                                .previewUrl(quiz.getPreviewUrl())
                                                .choice(quiz.getChoice())
                                                .build())
                        .collect(Collectors.toList());

        //        final List<Integer> indexes = createRandomQuiz(quizlist.size());
        final List<Integer> indexes = new ArrayList<>();
        indexes.add(11);
        indexes.add(20);
        indexes.add(7);

        final List<QuizResponse> todayQuizList = new ArrayList<>();

        indexes.stream().forEach(index -> todayQuizList.add(quizlist.get(index)));

        redisUtil.setObjectExpire(key, todayQuizList, 86400);

        return todayQuizList;
    }

    private List<Integer> createRandomQuiz(final int size) {
        final Random random = new Random();

        final List<Integer> selectedNumbers = new ArrayList<>();
        while (selectedNumbers.size() < 3) {
            final int randomNumber = random.nextInt(size);
            if (!selectedNumbers.contains(randomNumber)) {
                selectedNumbers.add(randomNumber);
            }
        }

        return selectedNumbers;
    }

    public ContentExperienceCountResponse getQuizExperienceCount(
            final QuizExperienceCountRequest quizExperienceCountRequest) {

        List<QuizHistoryResponse> quizHistoryResponses =
                quizHistoryQueryDSLRepository.findSolvedAtQuizHistory(
                        quizExperienceCountRequest.getUserId(),
                        quizExperienceCountRequest.getCreatedAt());

        return ContentExperienceCountResponse.of(quizHistoryResponses.size());
    }

    public void createGameHistory(
            final long userId, final GameHistoryCreationRequest gameHistoryCreationRequest) {
        final String key =
                "user_"
                        + userId
                        + "_"
                        + LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))
                        + "_"
                        + gameHistoryCreationRequest.getRoute();

        if (redisUtil.getData(key) == null) {
            userAuthClient.upgradeExperiencePoint(
                    UpdateExperiencePointRequest.of(userId, CONTENT_TYPE));
            redisUtil.setDataExpire(key, "attendance", 86400);
        }
    }

    public List<RhythmResponse> getRhythmList() {
        final String key =
                "rhythm_" + LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        List<RhythmResponse> rhythmResponseList = (List<RhythmResponse>) redisUtil.getObject(key);

        if (rhythmResponseList == null) {
            musicAuthClient.createRhythmList();
            rhythmResponseList = (List<RhythmResponse>) redisUtil.getObject(key);
        }

        return rhythmResponseList;
    }
}
