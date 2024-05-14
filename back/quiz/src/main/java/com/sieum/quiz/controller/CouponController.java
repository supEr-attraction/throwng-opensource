package com.sieum.quiz.controller;

import com.sieum.quiz.dto.request.CouponStatusRequest;
import com.sieum.quiz.dto.request.CouponValidationRequest;
import com.sieum.quiz.service.CouponService;
import com.sieum.quiz.validator.CouponValidator;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/coupons")
@RestController
@RequiredArgsConstructor
public class CouponController {

    private final CouponService couponService;
    private final CouponValidator couponValidator;

    @Operation(summary = "Create a coupon")
    @GetMapping("/{route}")
    public ResponseEntity<?> createCoupon(
            @RequestHeader("Authorization") final String authorization,
            @PathVariable final String route) {
        final long userId = couponService.getCurrentUserId(authorization);
        return ResponseEntity.ok().body(couponService.createCoupon(userId, route));
    }

    @Operation(summary = "Check if you received a coupon today")
    @GetMapping("/valid/{route}")
    public ResponseEntity<?> checkCoupon(
            @RequestHeader("Authorization") final String authorization,
            @PathVariable final String route) {
        final long userId = couponService.getCurrentUserId(authorization);
        return ResponseEntity.ok().body(couponService.checkCoupon(userId, route));
    }

    @Operation(summary = "feign client - Check user's coupon history")
    @GetMapping("/{userId}/history")
    public ResponseEntity<?> getCouponHistory(@PathVariable final long userId) {
        return ResponseEntity.ok().body(couponService.getCouponHistory(userId));
    }

    @Operation(summary = "feign client - Validating the coupon you are trying to use")
    @PostMapping("/validation")
    public ResponseEntity<?> validateCoupon(
            @RequestBody final CouponValidationRequest couponValidationRequest) {
        return ResponseEntity.ok(couponValidator.validateCoupon(couponValidationRequest));
    }

    @Operation(summary = "feign client - After using a coupon, change the coupon status")
    @PutMapping("/status")
    public ResponseEntity<?> modifyCouponStatus(
            @RequestBody final CouponStatusRequest couponStatusRequest) {
        couponService.modifyCouponStatus(couponStatusRequest);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "scheduler data creation test")
    @GetMapping("/test")
    public ResponseEntity<?> test() {
        couponService.sendCouponExpirationNotification();
        return ResponseEntity.noContent().build();
    }
}
