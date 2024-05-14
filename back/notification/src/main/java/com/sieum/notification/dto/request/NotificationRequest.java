package com.sieum.notification.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@AllArgsConstructor
@Getter
public class NotificationRequest {
    private String title;
    private String body;
    private String image;
    private String name;
}
