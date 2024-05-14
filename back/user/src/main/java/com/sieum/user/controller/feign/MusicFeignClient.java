package com.sieum.user.controller.feign;

import com.sieum.user.dto.request.MusicExperienceCountRequest;
import com.sieum.user.dto.response.MusicExperienceCountResponse;
import com.sieum.user.dto.response.PickedUpSongResponse;
import com.sieum.user.dto.response.ThrownSongResponse;
import java.util.List;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "MUSIC")
public interface MusicFeignClient {

    @GetMapping("/music/thrown-song/{userId}")
    Long countThrownSong(@PathVariable("userId") long userId);

    @GetMapping("/music/pick-song/{userId}")
    Long countPickUpSong(@PathVariable("userId") long userId);

    @GetMapping("/music/thrown-music/{userId}")
    List<ThrownSongResponse> getThrwonSong(@PathVariable("userId") long userId);

    @GetMapping("/music/picked-music/{userId}")
    List<PickedUpSongResponse> getPickedUpSong(@PathVariable("userId") long userId);

    @PostMapping("/music/music-experience")
    MusicExperienceCountResponse getMusicExperienceCount(
            @RequestBody final MusicExperienceCountRequest musicExperienceCountRequest);
}
