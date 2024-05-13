package com.sieum.quiz.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Getter
@Builder
@Validated
@NoArgsConstructor
@AllArgsConstructor
public class QuizHistoryCreationRequest {

    @NotNull(message = "quizId is required")
    @Schema(description = "quiz id")
    private Long quizId;

    @NotNull(message = "submit is required")
    @Schema(description = "answer that a user submitted")
    private String submit;
}
