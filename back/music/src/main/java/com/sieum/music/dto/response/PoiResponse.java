package com.sieum.music.dto.response;

import com.sieum.music.domain.dao.ThrowDao;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@Schema(description = "Point Of Interest")
public class PoiResponse {
    @Schema(description = "thrown music ID", example = "1")
    long itemId;

    @Schema(description = "album thumbnail URL", example = "/album/1/1.jpg")
    String albumImage;

    @Schema(description = "song title", example = "Into the Unknown")
    String songTitle;

    @Schema(description = "artist name of song", example = "Idina Menzel, Aurora")
    String artistName;

    @Schema(description = "latitude", example = "37.123456")
    double latitude;

    @Schema(description = "longitude", example = "127.123456")
    double longitude;

    @Schema(description = "is inner distance", example = "true")
    boolean isInnerDistance;

    @Schema(description = "Music that's only available on watch", example = "true")
    boolean isSecret;

    public static PoiResponse fromItemPoint(ThrowDao itemPointDao) {
        return builder()
                .itemId(itemPointDao.getId())
                .albumImage(itemPointDao.getAlbumImage())
                .songTitle(itemPointDao.getTitle())
                .artistName(itemPointDao.getName())
                .latitude(itemPointDao.getLocationPoint().getY())
                .longitude(itemPointDao.getLocationPoint().getX())
                .isInnerDistance(itemPointDao.getIsInnerDistance())
                .isSecret(itemPointDao.getIsPopular())
                .build();
    }
}
