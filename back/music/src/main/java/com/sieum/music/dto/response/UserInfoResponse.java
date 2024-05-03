package com.sieum.music.dto.response;

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
}
