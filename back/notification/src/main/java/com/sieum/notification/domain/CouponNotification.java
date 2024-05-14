package com.sieum.notification.domain;

import com.sieum.notification.domain.field.BodyData;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("coupon_notification")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class CouponNotification {

    @Id private String id;
    private String usage;
    private String category;
    private BodyData bodyData;
}
