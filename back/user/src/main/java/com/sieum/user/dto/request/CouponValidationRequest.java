package com.sieum.user.dto.request;

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
public class CouponValidationRequest {

    @Schema(description = "userId to user coupon")
    @NotNull
    private Long userId;

    @Schema(description = "id of the nickname change coupon you are currently using")
    @NotNull
    private Long couponId;

    @Schema(description = "coupon Type")
    private String couponType;

    public static CouponValidationRequest of(
            final long userId, final long couponId, final String type) {
        return new CouponValidationRequest(userId, couponId, type);
    }
}
