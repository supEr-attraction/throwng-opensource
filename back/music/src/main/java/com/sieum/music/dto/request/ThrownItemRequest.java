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
public class ThrownItemRequest {

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

    @Schema(description = "the address to which music will be thrown")
    private String location;

    @Schema(description = "comment")
    private String comment;

    @Schema(description = "imageUrl")
    private String imageUrl;

    @Schema(description = "title")
    private String title;

    @Schema(description = "artist")
    private String artist;

    @Schema(description = "albumImage")
    private String albumImageUrl;
}
