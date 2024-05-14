package com.sieum.music.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Check My Level")
public class UserLevelInfoResponse {

    @Schema(description = "userId")
    private long userId;

    @Schema(description = "level", example = "Into the Unknown")
    private int levelCount;
}
