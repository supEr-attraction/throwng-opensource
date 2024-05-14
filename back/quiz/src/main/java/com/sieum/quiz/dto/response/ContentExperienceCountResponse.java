package com.sieum.quiz.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@Schema(description = "Count my contents experience")
public class ContentExperienceCountResponse {

    @Schema(description = "contentCount")
    private long contentCount;

    public static ContentExperienceCountResponse of(final long contentCount) {
        return new ContentExperienceCountResponse(contentCount);
    }
}
