package com.sieum.notification.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Usage {
    COUPON("coupon_content_notification", "쿠폰"),
    CONTENT("content_attendance_notification", "컨텐츠");

    private String value;
    private String kr;
}
