package com.sieum.music.domain.dao;

import com.sieum.music.domain.enums.ThrowStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;

@NoArgsConstructor
@Getter
public class ThrowDao {

    private Point locationPoint;

    private Long id;

    private ThrowStatus status;

    private String albumImage;

    private String title;

    private String name;

    private Boolean isInnerDistance;

    public ThrowDao(
            Point locationPoint,
            Long id,
            String albumImage,
            String title,
            String name,
            boolean isInnerDistance,
            ThrowStatus status) {
        this.locationPoint = locationPoint;
        this.id = id;
        this.albumImage = albumImage;
        this.title = title;
        this.name = name;
        this.isInnerDistance = isInnerDistance;
        this.status = status;
    }
}
