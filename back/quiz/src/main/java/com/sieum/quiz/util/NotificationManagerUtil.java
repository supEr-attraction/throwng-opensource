package com.sieum.quiz.util;

import com.sieum.quiz.service.MattermostSenderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationManagerUtil {

    @Autowired private MattermostSenderService mattermostSenderService;

    public void sendNotification(Exception e, String uri, String params) {
        log.info("#### SEND Notification");
        mattermostSenderService.sendMessage(e, uri, params);
    }
}
