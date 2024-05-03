package com.sieum.user.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@Schema(description = "Check My Level")
public class UserLevelInfoResponse {

    @Schema(description = "userId")
    private long userId;

    @Schema(description = "level", example = "Into the Unknown")
    private int levelCount;

    public static UserLevelInfoResponse of(Long userId, int levelCount) {
        return new UserLevelInfoResponse(userId, levelCount);
    }
}
