package com.sieum.notification.domain;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("coupon_notification_log")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class CouponNotificationLog {

    @Id private String id;
    private LocalDateTime time;
    private Long userId;

    @DBRef(lazy = true)
    private CouponNotification couponNotification;
}
