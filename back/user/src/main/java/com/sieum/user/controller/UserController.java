package com.sieum.user.controller;

import com.sieum.user.dto.request.*;
import com.sieum.user.service.LoginService;
import com.sieum.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final LoginService loginService;
    private final UserService userService;

    @DeleteMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String accessToken) {
        loginService.logout(accessToken);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Feign Client")
    @GetMapping("/level/{userId}")
    public ResponseEntity<?> getUserLevelInfo(@PathVariable("userId") long userId) {
        return ResponseEntity.ok().body(userService.getUserLevelInfo(userId));
    }

    @GetMapping("/thrown-song")
    public ResponseEntity<?> getThrownSong(@RequestHeader("Authorization") String accessToken) {
        final long userId = loginService.getUsername(accessToken);
        return ResponseEntity.ok().body(userService.getThrownSong(userId));
    }

    @GetMapping("/picked-song")
    public ResponseEntity<?> getPickedUpSong(@RequestHeader("Authorization") String accessToken) {
        final long userId = loginService.getUsername(accessToken);
        return ResponseEntity.ok().body(userService.getPickedUpSong(userId));
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserLevel(@RequestHeader("Authorization") String accessToken) {
        final long userId = loginService.getUsername(accessToken);
        return ResponseEntity.ok().body(userService.getUserLevel(userId));
    }

    @Operation(summary = "Save user fcm token")
    @PostMapping("/fcm")
    public ResponseEntity<?> getUserFcm(
            @RequestHeader("Authorization") final String accessToken,
            @RequestBody final FcmTokenRequest fcmTokenRequest) {
        userService.createUserFcmToken(accessToken, fcmTokenRequest);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Feign Client")
    @GetMapping("/fcm-list")
    public ResponseEntity<?> getUserFcmList() {
        return ResponseEntity.ok().body(userService.getUserFcmList());
    }

    @Operation(summary = "Checking my coupon history")
    @GetMapping("/coupon")
    public ResponseEntity<?> getUserCouponHistory(
            @RequestHeader("Authorization") String accessToken) {
        long userId = loginService.getUsername(accessToken);
        return ResponseEntity.ok().body(userService.getUserCouponHistory(userId));
    }

    @Operation(summary = "Change my nickName with a coupon")
    @PutMapping("/nickname")
    public ResponseEntity<?> updateUserNickName(
            @RequestHeader("Authorization") final String accessToken,
            @RequestBody final CouponNickNameRequest couponNickNameRequest) {
        long userId = loginService.getUsername(accessToken);
        userService.modifyNickName(userId, couponNickNameRequest);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Checking my notification history")
    @GetMapping("/notification")
    public ResponseEntity<?> getUserNotificationHistory(
            @RequestHeader("Authorization") final String accessToken) {
        final long userId = loginService.getUsername(accessToken);
        return ResponseEntity.ok().body(userService.getUserNotificationHistory(userId));
    }

    @Operation(summary = "Feign Client")
    @GetMapping("/{userId}/fcm")
    public ResponseEntity<?> getUserFcmList(@PathVariable final long userId) {
        return ResponseEntity.ok().body(userService.getUserFcmToken(userId));
    }

    @Operation(summary = "Feign Client")
    @PostMapping("/experience-point")
    public ResponseEntity<?> upgradeExperiencePoint(
            @RequestBody final UpdateExperiencePointRequest updateExperiencePointRequest) {
        userService.upgradeExperiencePoint(updateExperiencePointRequest);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Feign Client - the number of throwng by level")
    @GetMapping("/{userId}/level-count")
    public ResponseEntity<?> getLevelThrowngCount(@PathVariable final long userId) {
        return ResponseEntity.ok().body(userService.getLevelThrowngCount(userId));
    }

    @Operation(summary = "Use coupon")
    @PostMapping("/coupon")
    public ResponseEntity<?> useCoupon(
            @RequestHeader("Authorization") final String accessToken,
            @RequestBody final UseCouponInfoRequest useCouponInfoRequest) {
        long userId = loginService.getUsername(accessToken);
        userService.useCoupon(userId, useCouponInfoRequest);
        return ResponseEntity.noContent().build();
    }
}
