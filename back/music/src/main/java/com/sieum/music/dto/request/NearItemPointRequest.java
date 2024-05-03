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
public class NearItemPointRequest {

    private static final Double DEFAULT_RADIUS = 600.0;
    private static final Double DEFAULT_DISTANCE = 1000.0;

    @Schema(description = "the distance of a place east or west", example = "127.123456")
    @IsLongitude
    @NotNull(message = "Longitude is required")
    private Double longitude;

    @Schema(
            description = "the position north or south of the equator measured from 0° to 90°",
            example = "37.123456")
    @IsLatitude
    @NotNull(message = "Latitude is required")
    private Double latitude;

    @Schema(description = "current location of user", example = "true")
    @NotNull(message = "isUserLocation is required")
    private Boolean isUserLocation;

    @Schema(description = "distance - (Unit - m)", example = "1000.0")
    private Double distance = DEFAULT_DISTANCE;

    @Schema(description = "a distance within a radius - (Unit - m)", example = "600.0")
    private Double innerDistance = DEFAULT_RADIUS;
}
