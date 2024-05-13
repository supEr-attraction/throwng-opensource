package com.sieum.user.controller;

import com.sieum.user.dto.MemberTokens;
import com.sieum.user.dto.request.OTPRequest;
import com.sieum.user.service.SseEmitters;
import com.sieum.user.service.WatchService;
import io.github.bucket4j.Bucket;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/watch")
@RequiredArgsConstructor
public class WatchController {

    private final WatchService watchService;
    private final SseEmitters sseEmitters;
    private final Bucket bucket;

    @GetMapping("/otp")
    public ResponseEntity<?> getOTP(@RequestHeader("Authorization") String accessToken) {
        if (!bucket.tryConsume(1)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
        }
        return ResponseEntity.ok().body(watchService.createOTP(accessToken));
    }

    @PostMapping("/auth")
    public ResponseEntity<?> authenticate(@Valid @RequestBody final OTPRequest otpRequest) {
        if (!bucket.tryConsume(1)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
        }
        MemberTokens memberTokens = watchService.authenticate(otpRequest);
        sseEmitters.successAuthentication();
        return ResponseEntity.ok().body(memberTokens);
    }
}
