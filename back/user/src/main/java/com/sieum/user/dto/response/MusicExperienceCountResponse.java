package com.sieum.user.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@Schema(description = "Count my music experience")
public class MusicExperienceCountResponse {

    @Schema(description = "throwngCount")
    private long throwngCount;

    @Schema(description = "pickedupCount")
    private long pickedupCount;
}
