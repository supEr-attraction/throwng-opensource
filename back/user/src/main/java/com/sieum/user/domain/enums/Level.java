package com.sieum.user.domain.enums;

import static com.sieum.user.common.CustomExceptionStatus.NOT_FOUND_LEVEL;

import com.fasterxml.jackson.annotation.JsonValue;
import com.sieum.user.exception.AuthException;
import java.util.Arrays;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Level {
    EARPHONES("EARPHONES", 1, 5),
    BUDS("BUDS", 2, 10),
    BUDS_PRO("BUDS_PRO", 3, 20),
    VVIP("VVIP", 4, 1000);

    private String value;

    @JsonValue private final int number;
    private final int count;

    public static Level getLevel(String value) {
        return Arrays.stream(Level.values())
                .filter(v -> v.value.equals(value))
                .findAny()
                .orElseThrow(() -> new AuthException(NOT_FOUND_LEVEL));
    }

    public static int getNumber(String value) {
        return getLevel(value).getNumber();
    }

    public int getNumber() {
        return number;
    }

    public static int getCount(String value) {
        return getLevel(value).getCount();
    }

    public int getCount() {
        return count;
    }
}
