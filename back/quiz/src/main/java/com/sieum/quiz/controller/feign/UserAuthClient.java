package com.sieum.quiz.controller.feign;

import com.sieum.quiz.dto.request.UpdateExperiencePointRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "USER")
public interface UserAuthClient {

    @GetMapping("/users/auth/id")
    long getUserId(@RequestHeader("Authorization") String accessToken);

    @PostMapping("/users/user/experience-point")
    void upgradeExperiencePoint(
            @RequestBody final UpdateExperiencePointRequest updateExperiencePointRequest);

    @GetMapping("/users/user/{userId}/level-count")
    int getLevelThrowngCount(@PathVariable final long userId);
}
