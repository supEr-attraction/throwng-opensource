package com.sieum.music.dto.response;

import com.sieum.music.domain.ThrowItem;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ThrownMusicDetailResponse {

    @Schema(description = "thrown music id")
    private Long throwId;

    @Schema(description = "title")
    private String title;

    @Schema(description = "artist")
    private String artist;

    @Schema(description = "albumImage")
    private String albumImage;

    @Schema(description = "itemImage")
    private String itemImage;

    @Schema(description = "content")
    private String content;

    @Schema(description = "thrown date")
    private LocalDateTime thrownDate;

    @Schema(description = "address")
    private String address;

    @Schema(description = "whether pickup or not")
    private boolean pickupStatus;

    @Schema(description = "preview url")
    private String previewUrl;

    @Schema(description = "otherPickedCount")
    private long otherPickedCount;

    public static ThrownMusicDetailResponse of(
            final ThrowItem throwItem, final long userId, final long otherCount) {
        return ThrownMusicDetailResponse.builder()
                .throwId(throwItem.getId())
                .title(throwItem.getSong().getTitle())
                .artist(throwItem.getSong().getArtist().getName())
                .albumImage(throwItem.getSong().getAlbumImage())
                .itemImage(throwItem.getItemImage())
                .content(throwItem.getContent())
                .thrownDate(throwItem.getCreatedAt())
                .address(
                        throwItem.getZipcode().getSigungu()
                                + " "
                                + throwItem.getZipcode().getDong())
                .pickupStatus(
                        throwItem.getThrowHistoryList().stream()
                                .anyMatch(
                                        throwHistory ->
                                                throwHistory.getUserId() == userId
                                                        && throwHistory.getThrowItem().getId()
                                                                == throwItem.getId()))
                .previewUrl(throwItem.getSong().getPreviewUrl())
                .otherPickedCount(otherCount)
                .build();
    }
}
