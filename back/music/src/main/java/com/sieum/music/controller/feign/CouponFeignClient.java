package com.sieum.music.controller.feign;

import com.sieum.music.dto.request.CouponStatusRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "QUIZ")
public interface CouponFeignClient {

    @PutMapping("/quizzes/coupons/status")
    void modifyCouponStatus(@RequestBody final CouponStatusRequest couponStatusRequest);
}
