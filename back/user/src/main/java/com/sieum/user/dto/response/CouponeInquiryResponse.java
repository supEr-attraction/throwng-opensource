package com.sieum.user.dto.response;

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
public class CouponeInquiryResponse {

    @Schema(description = "coupon id")
    private Long couponId;

    @Schema(description = "coupon name")
    private String couponName;

    @Schema(description = "coupon description")
    private String couponDescription;

    @Schema(description = "coupon endDate")
    private LocalDateTime couponEndDate;

    @Schema(description = "coupon status")
    private String couponStatus;

    @Schema(description = "coupon Type")
    private String couponType;
}
