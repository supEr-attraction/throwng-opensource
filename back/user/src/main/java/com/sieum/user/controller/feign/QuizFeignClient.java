package com.sieum.user.controller.feign;

import com.sieum.user.dto.request.CouponStatusRequest;
import com.sieum.user.dto.request.CouponValidationRequest;
import com.sieum.user.dto.response.CouponeInquiryResponse;
import java.util.List;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "QUIZ")
public interface QuizFeignClient {

    @GetMapping("/quizzes/coupons/{userId}/history")
    List<CouponeInquiryResponse> getCouponHistory(@PathVariable("userId") long userId);

    @PostMapping("/quizzes/coupons/validation")
    Boolean validateCoupon(@RequestBody final CouponValidationRequest couponValidationRequest);

    @PutMapping("/quizzes/coupons/status")
    void modifyCouponStatus(@RequestBody final CouponStatusRequest couponStatusRequest);

    //    @PostMapping("/quizzes/content-experience")
    //    ContentExperienceCountResponse getQuizExperienceCount(
    //            @RequestBody final MusicExperienceCountRequest musicExperienceCountRequest);
}
