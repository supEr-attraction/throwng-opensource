package com.sieum.quiz.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuizResponse implements Serializable {

    @Schema(description = "quiz id")
    private long quizId;

    @Schema(description = "question")
    private String question;

    @Schema(description = "multiple choice")
    private Map<String, Object> choice;

    @Schema(description = "quiz type")
    private String quizType;

    @Schema(description = "preview url")
    private String previewUrl;

    @Schema(description = "quizImage")
    private String quizImage;
}
