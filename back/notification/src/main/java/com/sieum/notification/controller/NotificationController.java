package com.sieum.notification.controller;

import com.sieum.notification.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @Operation(summary = "Sending user notification history")
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserNotificationHistory(@PathVariable final long userId) {
        return ResponseEntity.ok().body(notificationService.getUserNotificationHistory(userId));
    }

    @Operation(summary = "Sending coupon expiration notification - for test")
    @PostMapping("/coupons")
    public ResponseEntity<?> createCouponExpirationNotification() {
        notificationService.createCouponExpirationNotification();
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Sending content engagement notification - for test")
    @PostMapping("/contents")
    public ResponseEntity<?> createContentEngagementNotification() {
        notificationService.createContentEngagementNotification();
        return ResponseEntity.noContent().build();
    }
}
