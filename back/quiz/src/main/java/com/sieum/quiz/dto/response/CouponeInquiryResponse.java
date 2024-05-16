package com.sieum.quiz.dto.response;

import com.sieum.quiz.domain.Coupon;
import com.sieum.quiz.domain.CouponHistory;
import com.sieum.quiz.domain.enums.CouponStatus;
import com.sieum.quiz.domain.enums.CouponType;
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
    private static final int EXPIRATION_PERIOD = 7;

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

    public static LocalDateTime createEndDate(LocalDateTime createdAt) {
        return createdAt.plusDays(EXPIRATION_PERIOD);
    }

    public static CouponeInquiryResponse of(Coupon coupon, CouponHistory couponHistory) {
        return new CouponeInquiryResponse(
                coupon.getId(),
                CouponType.valueOf(coupon.getCouponType()).getName(),
                CouponType.valueOf(coupon.getCouponType()).getDescription(),
                createEndDate(coupon.getCreatedAt()),
                couponHistory.getCouponStatus(),
                coupon.getCouponType());
    }

    public static CouponeInquiryResponse of(CouponeInquiryResponse couponeInquiryResponse) {
        return new CouponeInquiryResponse(
                couponeInquiryResponse.getCouponId(),
                couponeInquiryResponse.getCouponName(),
                couponeInquiryResponse.getCouponDescription(),
                couponeInquiryResponse.getCouponEndDate(),
                CouponStatus.valueOf(couponeInquiryResponse.getCouponStatus()).getKr(),
                couponeInquiryResponse.getCouponType());
    }
}
