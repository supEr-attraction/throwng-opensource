package com.sieum.music.controller.feign;

import com.sieum.music.dto.request.UpdateExperiencePointRequest;
import com.sieum.music.dto.response.UserLevelInfoResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "USER")
public interface TokenAuthClient {

    @GetMapping("/users/auth/id")
    long getUserId(@RequestHeader("Authorization") String accessToken);

    //    @GetMapping("/users/auth/violation")
    //    long getLimitAccount(@RequestHeader("Authorization") String accessToken);

    @GetMapping("/users/auth/violation")
    UserLevelInfoResponse getLimitAccount(@RequestHeader("Authorization") String accessToken);

    @GetMapping("/users/user/level/{userId}")
    int getUserLevelInfo(@PathVariable("userId") long userId);

    @PostMapping("/users/user/experience-point")
    void upgradeExperiencePoint(
            @RequestBody final UpdateExperiencePointRequest updateExperiencePointRequest);
}
