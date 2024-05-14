package com.sieum.user.dto.response;

import com.sieum.user.domain.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@Schema(description = "Check My Level")
public class UserInfoResponse {

    @Schema(description = "userId")
    private long userId;

    @Schema(description = "nickName")
    private String nickName;

    @Schema(description = "level", example = "Into the Unknown")
    private int level;

    @Schema(description = "the number of songs thrown")
    private int experiencePoint;

    @Schema(
            description = "Regarding suspension of account",
            example = "NONE or TEMPORARY or PERMANENT")
    private String isBlock;

    public static UserInfoResponse of(final User user, final int level, final int experiencePoint) {
        return new UserInfoResponse(
                user.getId(), user.getNickName(), level, experiencePoint, user.getViolation());
    }
}
