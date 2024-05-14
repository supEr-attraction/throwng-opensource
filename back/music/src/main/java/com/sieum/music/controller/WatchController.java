package com.sieum.music.controller;

import com.sieum.music.dto.request.WatchThrownItemRequest;
import com.sieum.music.dto.response.UserLevelInfoResponse;
import com.sieum.music.service.WatchService;
import io.swagger.v3.oas.annotations.Operation;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/watch")
@RequiredArgsConstructor
public class WatchController {

    private final WatchService watchService;

    @Operation(summary = "Show playlist")
    @GetMapping("/playlists")
    public ResponseEntity<?> getPlaylist(
            @RequestHeader("Authorization") final String authorization) {
        final long userId = watchService.getCurrentUserId(authorization);
        return ResponseEntity.ok().body(watchService.getPlaylist(userId));
    }

    @Operation(summary = "Throw song")
    @PostMapping("/thrown-song")
    public ResponseEntity<?> thrownSong(
            @RequestHeader("Authorization") final String authorization,
            @RequestBody @Valid WatchThrownItemRequest watchThrownItemRequest) {
        UserLevelInfoResponse userLevelInfoResponse = watchService.getLimitAccount(authorization);
        watchService.thrownSong(userLevelInfoResponse, watchThrownItemRequest);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Pick up a song")
    @PostMapping("/pick/{throwId}")
    public ResponseEntity<?> createPickup(
            @RequestHeader("Authorization") final String authorization,
            @PathVariable("throwId") final long throwId) {
        final long userId = watchService.getCurrentUserId(authorization);
        watchService.createPickup(userId, throwId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Search for list of popular dropped music within legal dong")
    @GetMapping("/popular-items")
    public ResponseEntity<?> findPopularMusicAtLegalDong(
            @RequestParam("lon") final double longitude,
            @RequestParam("lat") final double latitude) {
        return ResponseEntity.ok()
                .body(watchService.findPopularMusicAtLegalDong(longitude, latitude));
    }
}
