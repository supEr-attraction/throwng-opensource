package com.sieum.quiz.controller;

import com.sieum.quiz.dto.request.GameHistoryCreationRequest;
import com.sieum.quiz.dto.request.QuizExperienceCountRequest;
import com.sieum.quiz.dto.request.QuizHistoryCreationRequest;
import com.sieum.quiz.service.QuizService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @Operation(summary = "Return daily quiz list")
    @GetMapping("/list")
    public ResponseEntity<?> getQuizList(
            @RequestHeader("Authorization") final String authorization) {
        return ResponseEntity.ok().body(quizService.getQuizList());
    }

    @Operation(summary = "Return whether or not to issue a coupon for the day")
    @GetMapping("/contents")
    public ResponseEntity<?> getCouponIssuanceStatus(
            @RequestHeader("Authorization") final String authorization) {
        final long userId = quizService.getCurrentUserId(authorization);
        return ResponseEntity.ok().body(quizService.getCouponIssuanceStatus(userId));
    }

    @Operation(summary = "Save quiz history after user submitted the answer")
    @PostMapping("/result")
    public ResponseEntity<?> createQuizHistory(
            @RequestHeader("Authorization") final String authorization,
            @RequestBody final QuizHistoryCreationRequest quizHistoryCreationRequest) {

        final long userId = quizService.getCurrentUserId(authorization);
        return ResponseEntity.ok()
                .body(quizService.createQuizHistory(userId, quizHistoryCreationRequest));
    }

    @Operation(summary = "Save game history on redis after user submitted the answer")
    @PostMapping("/contents/result")
    public ResponseEntity<?> createGameHistory(
            @RequestHeader("Authorization") final String authorization,
            @RequestBody final GameHistoryCreationRequest gameHistoryCreationRequest) {

        final long userId = quizService.getCurrentUserId(authorization);
        quizService.createGameHistory(userId, gameHistoryCreationRequest);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Return daily rhythm game list")
    @GetMapping("/contents/rhythm")
    public ResponseEntity<?> getRhythmList() {
        return ResponseEntity.ok().body(quizService.getRhythmList());
    }

    @Operation(summary = "Feign Client - Number of quizzes experienced by the user")
    @PostMapping("/content-experience")
    public ResponseEntity<?> getQuizExperienceCount(
            @RequestBody final QuizExperienceCountRequest quizExperienceCountRequest) {

        return ResponseEntity.ok()
                .body(quizService.getQuizExperienceCount(quizExperienceCountRequest));
    }
}
