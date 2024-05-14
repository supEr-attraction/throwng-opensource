package com.sieum.music.repository;

import static com.sieum.music.domain.QThrowHistory.throwHistory;
import static com.sieum.music.domain.QThrowItem.throwItem;
import static com.sieum.music.domain.QZipcode.zipcode;

import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class BatchQueryDSLRepository {

    private final JPAQueryFactory queryFactory;

    private final long DEFAULT_POPULAR_DAY = 7L;

    public List<Integer> getZipCodeId() {
        return queryFactory.select(zipcode.zipcodeId).from(zipcode).fetch();
    }

    public Long getLegalDongPickUpCount(final int zipCodeId) {
        return queryFactory
                .select(throwItem.id)
                .from(throwItem)
                .where(
                        throwItem
                                .zipcode
                                .zipcodeId
                                .eq(zipCodeId)
                                .and(
                                        throwItem.createdAt.goe(
                                                LocalDate.now()
                                                        .minusDays(DEFAULT_POPULAR_DAY)
                                                        .atStartOfDay())))
                .stream()
                .count();
    }

    public void updatePopularMusic(List<Long> throwIds) {
        queryFactory
                .update(throwItem)
                .set(throwItem.isPopular, true)
                .where(throwItem.id.in(throwIds))
                .execute();
    }

    public List<Long> getPopularThrowItems(int limitCnt, int zipCodeId) {
        return queryFactory
                .select(throwItem.id)
                .from(throwHistory)
                .join(throwItem)
                .on(throwHistory.throwItem.id.eq(throwItem.id))
                .where(
                        throwItem
                                .zipcode
                                .zipcodeId
                                .eq(zipCodeId)
                                .and(
                                        throwHistory.createdAt.goe(
                                                LocalDate.now()
                                                        .minusDays(DEFAULT_POPULAR_DAY)
                                                        .atStartOfDay())))
                .groupBy(throwItem.id)
                .orderBy(throwHistory.count().desc())
                .limit(limitCnt)
                .fetch();
    }
}
