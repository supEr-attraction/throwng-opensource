package com.sieum.music.dto.request;

import com.sieum.music.annotation.IsLatitude;
import com.sieum.music.annotation.IsLongitude;
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
public class ReverseGeoCodeRequest {
    @Schema(description = "Latitude", example = "37.123456")
    @IsLatitude
    @NotNull(message = "Latitude is required")
    private Double latitude;

    @Schema(description = "Longitude", example = "127.123456")
    @IsLongitude
    @NotNull(message = "Longitude is required")
    private Double longitude;
}
