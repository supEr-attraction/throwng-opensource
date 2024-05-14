package com.sieum.music.dto.response;

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

    public static MusicExperienceCountResponse of(
            final long throwngCount, final long pickedupCount) {
        return new MusicExperienceCountResponse(throwngCount, pickedupCount);
    }
}
