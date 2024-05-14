package com.sieum.music.repository;

import static com.sieum.music.domain.QArtist.artist;
import static com.sieum.music.domain.QSong.song;
import static com.sieum.music.domain.QThrowHistory.throwHistory;
import static com.sieum.music.domain.QThrowItem.throwItem;
import static com.sieum.music.domain.QZipcode.zipcode;
import static com.sieum.music.repository.MySqlSpatialFunction.mySqlDistanceSphereFunction;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sieum.music.domain.ThrowItem;
import com.sieum.music.domain.dao.ThrowCurrentDao;
import com.sieum.music.domain.dao.ThrowDao;
import com.sieum.music.domain.enums.ThrowStatus;
import com.sieum.music.dto.response.WatchFamousMusicResponse;
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
                                        .as("isInnerDistance"),
                                throwItem.isPopular))
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

    public List<ThrowItem> findThrowHistoryIsNull() {
        return queryFactory
                .selectFrom(throwItem)
                .leftJoin(throwHistory)
                .on(throwItem.id.eq(throwHistory.throwItem.id))
                .where(throwItem.status.eq(ThrowStatus.VISIBLE).and(throwHistory.id.isNull()))
                .fetch();
    }

    public ThrowCurrentDao findNearItemsPointsByDistanceAndUserIdAndCreatedAtAndYoutubeId(
            Point point, Double innerDistance, Long userId, String nowDate, String youtubeId) {
        return queryFactory
                .select(Projections.fields(ThrowCurrentDao.class, throwItem.id, throwItem.status))
                .from(throwItem)
                .join(throwItem.song, song)
                .on(throwItem.song.id.eq(song.id))
                .where(
                        mySqlDistanceSphereFunction(throwItem.locationPoint, point)
                                .loe(String.valueOf(innerDistance)),
                        throwItem.userId.eq(userId),
                        Expressions.stringTemplate(
                                        "DATE_FORMAT({0}, {1})", throwItem.createdAt, "%Y/%m/%d")
                                .eq(nowDate),
                        throwItem.song.youtubeId.eq(youtubeId))
                .fetchFirst();
    }

    public List<WatchFamousMusicResponse> findByZipCodeIdAndIsPopular(String code) {
        return queryFactory
                .select(
                        Projections.fields(
                                WatchFamousMusicResponse.class,
                                throwItem.id,
                                throwItem.song.title,
                                artist.name,
                                throwItem.song.albumImage,
                                song.youtubeId,
                                throwItem.content))
                .from(throwItem)
                .join(throwItem.zipcode, zipcode)
                .on(throwItem.zipcode.zipcodeId.eq(zipcode.zipcodeId))
                .join(throwItem.song, song)
                .on(throwItem.song.id.eq(song.id))
                .join(song.artist, artist)
                .on(song.artist.id.eq(artist.id))
                .where(throwItem.zipcode.code.eq(code), throwItem.isPopular.eq(true))
                .fetch();
    }
}
