package com.sieum.quiz.repository;

import com.sieum.quiz.domain.Coupon;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CouponReposistory extends JpaRepository<Coupon, Long> {

    boolean existsByCreatedAtAfterAndRouteAndUserId(
            final LocalDateTime localDateTime, final String byName, final long userId);

    List<Coupon> findByUserId(final long userId);

    Optional<Coupon> findByIdAndUserId(final long id, final long userId);
}
