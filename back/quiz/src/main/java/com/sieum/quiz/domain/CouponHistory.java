package com.sieum.quiz.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@Table(name = "coupon_history")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class CouponHistory extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "coupon_history_id")
    private Long id;

    @Column(length = 10)
    @NotNull
    private String couponStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coupon_id")
    @NotNull
    private Coupon coupon;

    public void changeCouponStatus(final String status) {
        this.couponStatus = status;
    }
}
