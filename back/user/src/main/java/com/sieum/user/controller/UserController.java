package com.sieum.user.controller;

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
}
