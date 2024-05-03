package com.sieum.music.dto.response;

import com.sieum.music.domain.ThrowHistory;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@Schema(description = "Check my picked up songs")
public class PickedUpSongResponse {

    @Schema(description = "myPickId")
    private long myPickId;

    @Schema(description = "title")
    private String title;

    @Schema(description = "artist")
    private String artist;

    @Schema(description = "albumImage")
    private String albumImage;

    @Schema(description = "comment")
    private String comment;

    @Schema(description = "pickDate")
    private LocalDateTime pickDate;

    @Schema(description = "location")
    private String location;

    @Schema(description = "throwId")
    private long throwId;

    public static PickedUpSongResponse of(ThrowHistory throwHistory) {
        return new PickedUpSongResponse(
                throwHistory.getId(),
                throwHistory.getThrowItem().getSong().getTitle(),
                throwHistory.getThrowItem().getSong().getArtist().getName(),
                throwHistory.getThrowItem().getSong().getAlbumImage(),
                throwHistory.getThrowItem().getContent(),
                throwHistory.getCreatedAt(),
                (throwHistory.getThrowItem().getZipcode().getSigungu()
                        + " "
                        + throwHistory.getThrowItem().getZipcode().getDong()),
                throwHistory.getThrowItem().getId());
    }
}
