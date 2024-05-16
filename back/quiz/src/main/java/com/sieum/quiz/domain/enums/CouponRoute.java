package com.sieum.quiz.domain.enums;

import static com.sieum.quiz.exception.CustomExceptionStatus.INVALID_COUPON_ROUTE;

import com.sieum.quiz.exception.BadRequestException;
import java.util.Arrays;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CouponRoute {
    QUIZ("quiz"),
    RHYTHM("rhythm"),
    MEMORY("memory");

    private String name;

    public static String findByName(final String name) {
        return Arrays.stream(CouponRoute.values())
                .filter(route -> route.getName().equalsIgnoreCase(name))
                .findFirst()
                .map(Enum::name)
                .orElseThrow(() -> new BadRequestException(INVALID_COUPON_ROUTE));
    }
}
