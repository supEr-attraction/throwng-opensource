package com.sieum.user.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Count my contents experience")
public class ContentExperienceCountResponse {

    @Schema(description = "contentCount")
    private long contentCount;
}
