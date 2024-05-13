package com.sieum.quiz.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CouponHistoryNewestResponse {

    @Schema(description = "coupon id")
    private Long couponId;

    @Schema(description = "coupon history created date")
    private LocalDateTime createdAt;
}
