package com.sieum.music.repository;

import static com.sieum.music.domain.QArtist.artist;
import static com.sieum.music.domain.QSong.song;
import static com.sieum.music.domain.QThrowHistory.throwHistory;
import static com.sieum.music.domain.QThrowItem.throwItem;
import static com.sieum.music.repository.MySqlSpatialFunction.mySqlDistanceSphereFunction;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sieum.music.domain.dao.ThrowDao;
import com.sieum.music.domain.enums.ThrowStatus;
import com.sieum.music.dto.response.ThrowItemResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ThrowQueryDSLRepository {

    private final JPAQueryFactory queryFactory;
    private final long DEFAULT_DELETE_DAY = 7L;

    public List<ThrowDao> findNearItemsPointsByDistance(
            Point point, Double distance, Double innerDistance) {
        return queryFactory
                .select(
                        Projections.fields(
                                ThrowDao.class,
                                throwItem.locationPoint,
                                throwItem.id,
                                throwItem.status,
                                song.albumImage,
                                song.title,
                                artist.name,
                                mySqlDistanceSphereFunction(throwItem.locationPoint, point)
                                        .loe(String.valueOf(innerDistance))
                                        .as("isInnerDistance")))
                .from(throwItem)
                .join(throwItem.song, song)
                .on(throwItem.song.id.eq(song.id))
                .join(song.artist, artist)
                .on(song.artist.id.eq(artist.id))
                .where(
                        mySqlDistanceSphereFunction(throwItem.locationPoint, point)
                                .loe(String.valueOf(distance)))
                .fetch();
    }

    public List<ThrowItemResponse> findThrowHistoryIsNull() {
        return queryFactory
                .select(Projections.fields(ThrowItemResponse.class, throwItem.id))
                .from(throwItem)
                .leftJoin(throwHistory)
                .on(throwItem.id.eq(throwHistory.throwItem.id))
                .where(throwItem.status.eq(ThrowStatus.VISIBLE).and(throwHistory.id.isNull()))
                .fetch();
    }
}
