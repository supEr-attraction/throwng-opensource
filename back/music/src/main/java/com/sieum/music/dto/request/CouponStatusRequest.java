package com.sieum.music.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Getter
@Builder
@Validated
@NoArgsConstructor
@AllArgsConstructor
public class CouponStatusRequest {
    @Schema(description = "id of the nickname change coupon you are currently using")
    @NotNull
    private Long couponId;

    @Schema(description = "userId to user coupon")
    @NotNull
    private Long userId;

    @Schema(description = "coupon Type")
    private String couponType;

    public static CouponStatusRequest of(
            final long couponId, final long userId, final String couponType) {
        return new CouponStatusRequest(couponId, userId, couponType);
    }
}
