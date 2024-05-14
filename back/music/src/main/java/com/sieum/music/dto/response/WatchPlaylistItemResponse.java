package com.sieum.music.dto.response;

import com.sieum.music.domain.Playlist;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WatchPlaylistItemResponse {
    @Schema(description = "playlist id")
    private Integer playlistId;

    @Schema(description = "song ID")
    private Integer songId;

    @Schema(description = "title")
    private String title;

    @Schema(description = "artist")
    private String artist;

    @Schema(description = "albumImage URL")
    private String albumImage;

    @Schema(description = "youtube ID")
    private String youtubeId;

    @Schema(description = "previewUrl")
    private String previewUrl;

    public static WatchPlaylistItemResponse of(final Playlist playlist) {
        return builder()
                .playlistId(playlist.getId())
                .songId(playlist.getSong().getId())
                .title(playlist.getSong().getTitle())
                .artist(playlist.getSong().getArtist().getName())
                .albumImage(playlist.getSong().getAlbumImage())
                .youtubeId(playlist.getSong().getYoutubeId())
                .previewUrl(playlist.getSong().getPreviewUrl())
                .build();
    }
}
