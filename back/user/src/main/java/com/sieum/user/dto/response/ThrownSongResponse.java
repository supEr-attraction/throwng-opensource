package com.sieum.user.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@Schema(description = "Check My thrown songs")
public class ThrownSongResponse {

    @Schema(description = "myThrowId")
    private long myThrowId;

    @Schema(description = "title")
    private String title;

    @Schema(description = "artist")
    private String artist;

    @Schema(description = "albumImage")
    private String albumImage;

    @Schema(description = "comment")
    private String comment;

    @Schema(description = "dropDate")
    private LocalDateTime dropDate;

    @Schema(description = "location")
    private String location;

    @Schema(description = "otherPickedCount")
    private long otherPickedCount;
}
