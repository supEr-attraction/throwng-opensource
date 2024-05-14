package com.sieum.batch.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;

@FeignClient(name = "MUSIC")
public interface MusicFeignClient {
    @DeleteMapping("/music/throw-items")
    long deleteNotFamousMusic();

    @PutMapping("/music/batch/popular")
    void popularMusic();
}
