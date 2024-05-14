package com.sieum.notification.service;

import static com.sieum.notification.exception.CustomExceptionStatus.*;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.MulticastMessage;
import com.google.firebase.messaging.Notification;
import com.sieum.notification.dto.FcmMessage;
import com.sieum.notification.exception.BadRequestException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ExecutionException;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FcmService {

    @Async
    public void sendMessageTo(final List<String> targetTokens, final FcmMessage fcmMessage) {

        final MulticastMessage message = makeMessage(targetTokens, fcmMessage);

        try {
            FirebaseMessaging.getInstance().sendEachForMulticastAsync(message).get();
        } catch (InterruptedException | ExecutionException e) {
            throw new BadRequestException(FCM_SENDING_ERROR);
        }
    }

    private MulticastMessage makeMessage(
            final List<String> targetTokens, final FcmMessage fcmMessage) {
        final MulticastMessage multicastMessage =
                MulticastMessage.builder()
                        .putAllData(
                                new HashMap<>() {
                                    {
                                        put("time", LocalDateTime.now().toString());
                                        put("link", fcmMessage.getLink());
                                    }
                                })
                        .setNotification(
                                Notification.builder()
                                        .setTitle(fcmMessage.getTitle())
                                        .setBody(fcmMessage.getBody())
                                        .setImage(fcmMessage.getImage())
                                        .build())
                        .addAllTokens(targetTokens)
                        .build();
        return multicastMessage;
    }
}
