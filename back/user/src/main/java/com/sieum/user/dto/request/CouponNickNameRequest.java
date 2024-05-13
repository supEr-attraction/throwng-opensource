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
public class CouponNickNameRequest {

    @Schema(description = "id of the nickname change coupon you are currently using")
    @NotNull
    private long couponId;

    @Schema(description = "nickname to change")
    @NotNull
    private String nickName;

    @Schema(description = "types of coupons that can be used")
    @NotNull
    private String couponType;
}
