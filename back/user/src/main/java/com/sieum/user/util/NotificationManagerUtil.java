package com.sieum.user.util;

import com.sieum.user.service.MattermostSenderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationManagerUtil {
    private final MattermostSenderService mattermostSenderService;

    public void sendNotification(Exception e, String uri, String params) {
        log.info("#### SEND Notification");
        mattermostSenderService.sendMessage(e, uri, params);
    }
}
