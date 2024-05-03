package com.sieum.user.dto.response;

import com.sieum.user.domain.User;
import com.sieum.user.domain.enums.Level;
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
    private Long thrownCount;

    @Schema(description = "the number of songs picked upe", example = "Into the Unknown")
    private Long pickCount;

    @Schema(
            description = "Regarding suspension of account",
            example = "NONE or TEMPORARY or PERMANENT")
    private String isBlock;

    public static UserInfoResponse of(User user, Long thrownCount, Long pickCount) {
        return new UserInfoResponse(
                user.getId(),
                user.getNickName(),
                Level.getNumber(user.getLevel()),
                thrownCount,
                pickCount,
                user.getViolation());
    }
}
