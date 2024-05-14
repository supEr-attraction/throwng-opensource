package com.sieum.quiz.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CouponIssuanceResponse {

    @Schema(description = "coupon issuance status")
    private boolean couponStatus;
}
