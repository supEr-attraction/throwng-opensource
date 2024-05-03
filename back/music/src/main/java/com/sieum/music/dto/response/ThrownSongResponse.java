package com.sieum.music.dto.response;

import com.sieum.music.domain.ThrowItem;
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

    public static ThrownSongResponse of(ThrowItem throwItem) {
        return new ThrownSongResponse(
                throwItem.getId(),
                throwItem.getSong().getTitle(),
                throwItem.getSong().getArtist().getName(),
                throwItem.getSong().getAlbumImage(),
                throwItem.getContent(),
                throwItem.getCreatedAt(),
                (throwItem.getZipcode().getSigungu() + " " + throwItem.getZipcode().getDong()));
    }
}
