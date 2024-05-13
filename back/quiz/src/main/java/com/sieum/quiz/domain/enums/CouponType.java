package com.sieum.quiz.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CouponType {
    WIDE("반경 밖 노래 조회 쿠폰", "현재 위치와 상관 없이 궁금한 음악을 주워보세요!", 0.05),
    THROWNG_INF("24시간 무제한 쓰롱 쿠폰", "개수에 상관 없이 자유롭게 쓰롱 해보세요!", 0.1),
    THROWNG_TWICE("레벨 2배 쓰롱 쿠폰", "현재 레벨 쓰롱 개수의 2배만큼 추가로 쓰롱 할 수 있어요!", 0.2),
    THROWNG_LEVEL("레벨만큼 추가 쓰롱 쿠폰", "현재 레벨 쓰롱 개수만큼 추가로 쓰롱 할 수 있어요!", 0.35),
    THROWNG_FIVE("쓰롱 5개 추가 쿠폰", "5개를 추가로 쓰롱 할 수 있어요!", 0.55),
    NICKNAME("닉네임 변경 쿠폰", "닉네임을 원하는대로 변경해보세요!", 0.7),
    BOOM("꽝", "꽝! 아쉽지만 내일 만나요!", 0.9),
    QUESTION("물음표 음악 조회 쿠폰", "갤럭시 워치로만 볼 수 있었던 음악을 조회할 수 있어요!", 1.0);

    private String name;
    private String description;
    private double probability;

    CouponType(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
