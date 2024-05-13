package com.sieum.user.controller.feign;

import com.sieum.user.dto.response.NotificationHistoryResponse;
import java.util.List;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "NOTIFICATION")
public interface NotificationFeignClient {

    @GetMapping("/notifications/{userId}")
    List<NotificationHistoryResponse> getUserNotificationHistory(@PathVariable long userId);
}
