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
public class UpdateExperiencePointRequest {

    @Schema(description = "userId")
    @NotNull(message = "userId is required")
    private long userId;

    @Schema(description = "Experience value type")
    @NotNull(message = "Experience value type is required")
    private String type;

    public static UpdateExperiencePointRequest of(final long userId, final String type) {
        return new UpdateExperiencePointRequest(userId, type);
    }
}
