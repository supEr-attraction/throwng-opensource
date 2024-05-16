package com.sieum.quiz.controller.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "MUSIC")
public interface MusicAuthClient {

    @GetMapping("/music/rhythm")
    void createRhythmList();
}
