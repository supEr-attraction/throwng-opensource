package com.sieum.quiz.repository;

import com.sieum.quiz.domain.CouponHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CouponHistoryRepository extends JpaRepository<CouponHistory, Long> {

    CouponHistory findTopByCouponIdOrderByCreatedAtDesc(final long CouponId);
}
