package com.sieum.quiz.dto.response;

import com.sieum.quiz.domain.Coupon;
import com.sieum.quiz.domain.enums.CouponType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateCouponResponse {

    @Schema(description = "coupon type")
    private String couponType;

    @Schema(description = "coupon description")
    private String couponDescription;

    public static CreateCouponResponse of(final Coupon coupon) {
        return CreateCouponResponse.builder()
                .couponType(CouponType.valueOf(coupon.getCouponType()).getName())
                .couponDescription(CouponType.valueOf(coupon.getCouponType()).getDescription())
                .build();
    }
}
