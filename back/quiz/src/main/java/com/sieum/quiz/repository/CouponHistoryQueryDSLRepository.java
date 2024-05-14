package com.sieum.quiz.repository;

import static com.sieum.quiz.domain.QCoupon.coupon;
import static com.sieum.quiz.domain.QCouponHistory.couponHistory;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sieum.quiz.dto.response.CouponHistoryNewestResponse;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CouponHistoryQueryDSLRepository {

    private final JPAQueryFactory queryFactory;
    private final long DEFAULT_DELETE_DAY = 7L;

    public List<CouponHistoryNewestResponse> findNewestCouponHistory() {

        return queryFactory
                .select(
                        Projections.fields(
                                CouponHistoryNewestResponse.class,
                                coupon.id.as("couponId"),
                                couponHistory.createdAt.max().as("createdAt")))
                .from(coupon)
                .join(couponHistory)
                .on(coupon.id.eq(couponHistory.coupon.id))
                .groupBy(coupon.id)
                .fetch();
    }

    public Long findExpirationCouponHistory(
            CouponHistoryNewestResponse couponHistoryNewestResponse) {

        return queryFactory
                .select(couponHistory.count())
                .from(couponHistory)
                .where(
                        couponHistory.coupon.id.eq(couponHistoryNewestResponse.getCouponId()),
                        couponHistory.createdAt.eq(couponHistoryNewestResponse.getCreatedAt()),
                        couponHistory.couponStatus.eq("NONE"),
                        Expressions.stringTemplate(
                                        "DATE_FORMAT({0}, '%Y-%m-%d')", couponHistory.createdAt)
                                .eq(String.valueOf(LocalDate.now().minusDays(6))))
                .fetchOne();
    }
}
