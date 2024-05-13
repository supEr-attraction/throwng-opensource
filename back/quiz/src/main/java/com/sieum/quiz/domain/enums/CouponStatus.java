package com.sieum.quiz.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CouponStatus {
    NONE("사용 전"),
    INUSE("사용 중"),
    COMPLETION("만료");

    private String kr;

    public String getKr() {
        return kr;
    }
}
