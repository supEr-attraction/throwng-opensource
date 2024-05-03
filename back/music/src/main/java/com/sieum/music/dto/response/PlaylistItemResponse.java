package com.sieum.music.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PlaylistItemResponse {

    @Schema(description = "playlist id")
    private Integer playlistId;

    @Schema(description = "title")
    private String title;

    @Schema(description = "artist")
    private String artist;

    @Schema(description = "albumImage")
    private String albumImage;

    @Schema(description = "modifiedAt")
    private LocalDateTime modifiedAt;

    @Schema(description = "youtubeId")
    private String youtubeId;
}
