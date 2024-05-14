package com.sieum.music.controller;

import com.sieum.music.dto.request.MusicExperienceCountReqeust;
import com.sieum.music.dto.request.NearItemPointRequest;
import com.sieum.music.dto.request.ReverseGeoCodeRequest;
import com.sieum.music.dto.request.ThrownItemRequest;
import com.sieum.music.dto.response.UserLevelInfoResponse;
import com.sieum.music.service.MusicService;
import com.sieum.music.util.SpotifyUtil;
import com.sieum.music.util.YoutubeMusicUtil;
import io.swagger.v3.oas.annotations.Operation;
import java.time.LocalDateTime;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MusicController {

    private final MusicService musicService;
    private final YoutubeMusicUtil youtubeMusicUtil;
    private final SpotifyUtil spotifyUtil;

    @Operation(summary = "Show detail of a thrown music")
    @GetMapping("/thrown/{throwId}")
    public ResponseEntity<?> getDetailOfThrownMusic(
            @RequestHeader("Authorization") final String authorization,
            @PathVariable final long throwId) {
        final long userId = musicService.getCurrentUserId(authorization);
        return ResponseEntity.ok().body(musicService.getDetailOfThrownMusic(userId, throwId));
    }

    @Operation(summary = "Pick up a song")
    @PostMapping("/pick/{throwId}")
    public ResponseEntity<?> createPickup(
            @RequestHeader("Authorization") final String authorization,
            @PathVariable("throwId") final long throwId) {
        final long userId = musicService.getCurrentUserId(authorization);
        musicService.createPickup(userId, throwId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Show playlist")
    @GetMapping("/playlists")
    public ResponseEntity<?> getPlaylist(
            @RequestHeader("Authorization") final String authorization,
            @RequestParam(value = "time", required = false)
                    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
                    final LocalDateTime modifiedAt) {
        final long userId = musicService.getCurrentUserId(authorization);
        return ResponseEntity.ok().body(musicService.getPlaylist(userId, modifiedAt));
    }

    //    @Operation(summary = "Search for songs on YouTube")
    //    @GetMapping("/search/{keyword}")
    //    public ResponseEntity<?> searchSong(@PathVariable("keyword") String keyword) {
    //        List<SearchSongResponse> searchSongResponse =
    // youtubeMusicUtil.searchSongInYoutube(keyword);
    //        return ResponseEntity.ok().body(searchSongResponse);
    //    }

    @Operation(summary = "Search for songs on Spotify")
    @GetMapping("/search")
    public ResponseEntity<?> searchSong2(@RequestParam("keyword") final String keyword) {
        return ResponseEntity.ok().body(spotifyUtil.searchSongInSpotify(keyword));
    }

    @Operation(summary = "Search for list of dropped music within 600 radius")
    @PostMapping("/thrown/points")
    public ResponseEntity<?> findNearItemsPoints(
            @Valid @RequestBody NearItemPointRequest nearItemPointRequest) {
        return ResponseEntity.ok().body(musicService.findNearItemsPoints(nearItemPointRequest));
    }

    @Operation(summary = "Delete playlist")
    @DeleteMapping("/playlists/{playlistId}")
    public ResponseEntity<?> deletePlaylist(
            @RequestHeader("Authorization") final String authorization,
            @PathVariable final int playlistId) {
        final long userId = musicService.getCurrentUserId(authorization);
        musicService.deletePlaylist(userId, playlistId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Count the number of songs thrown by the user")
    @GetMapping("/thrown-song/{userId}")
    public ResponseEntity<?> countThrownSong(@PathVariable("userId") long userId) {
        return ResponseEntity.ok(musicService.countThrowngSong(userId));
    }

    @Operation(summary = "Count the number of songs the user picked up")
    @GetMapping("/pick-song/{userId}")
    public ResponseEntity<?> countPickUpSong(@PathVariable("userId") long userId) {
        return ResponseEntity.ok(musicService.countPickUpSong(userId));
    }

    //    @GetMapping("/throw-items")
    //    @Operation(summary = "Look up music that has no record of picking up")
    //    public ResponseEntity<?> getThrowItems() {
    //        return ResponseEntity.ok(musicService.getThrowItems());
    //    }

    @Operation(summary = "Throw song")
    @PostMapping("/thrown-song/{youtubeId}")
    public ResponseEntity<?> thrownSong(
            @RequestHeader("Authorization") final String authorization,
            @PathVariable("youtubeId") final String youtubeId,
            @RequestBody @Valid ThrownItemRequest thrownItemRequest) {
        //        final long userId = musicService.getLimitAccount(authorization);
        UserLevelInfoResponse userLevelInfoResponse = musicService.getLimitAccount(authorization);
        musicService.thrownSong(userLevelInfoResponse, youtubeId, thrownItemRequest);

        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Feign Client")
    @GetMapping("/thrown-music/{userId}")
    public ResponseEntity<?> getThrownSong(@PathVariable("userId") long userId) {
        return ResponseEntity.ok().body(musicService.getThrownSong(userId));
    }

    @Operation(summary = "Feign Client - Check User picked-music list ")
    @GetMapping("/picked-music/{userId}")
    public ResponseEntity<?> getPickedUpSong(@PathVariable("userId") long userId) {
        return ResponseEntity.ok().body(musicService.getPickedUpSong(userId));
    }

    @PostMapping("/reverse-geocode")
    public ResponseEntity<?> reverseGeoCode(
            @Valid @RequestBody ReverseGeoCodeRequest reverseGeoCodeRequest) {
        return ResponseEntity.ok().body(musicService.getReverseGeo(reverseGeoCodeRequest));
    }

    @DeleteMapping("/throw-items")
    @Operation(summary = "Feign Client - update status to HIDDEN")
    public ResponseEntity<?> deleteNotFamousMusic() {
        return ResponseEntity.ok().body(musicService.deleteNotFamousMusic());
    }

    @Operation(summary = "Feign Client")
    @PostMapping("/music-experience")
    public ResponseEntity<?> getMusicExperienceCount(
            @RequestBody MusicExperienceCountReqeust musicExperienceCountReqeust) {
        return ResponseEntity.ok()
                .body(musicService.getMusicExperienceCount(musicExperienceCountReqeust));
    }

    @Operation(summary = "Check unlimited radius coupon usage")
    @GetMapping("/check-radius-coupon")
    public ResponseEntity<?> isUsingUnlimitedRadiusCoupon(
            @RequestHeader("Authorization") final String authorization) {
        final long userId = musicService.getCurrentUserId(authorization);
        return ResponseEntity.ok().body(musicService.checkUsingUnlimitedRadiusCoupon(userId));
    }
}
