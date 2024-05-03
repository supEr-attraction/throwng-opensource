package com.sieum.user.domain.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Violation {
    NONE("NONE", "해당없음"),
    TEMPORARY("TEMPORARY", "7일 정지"),
    PERMANENT("PERMANENT", "영구정지");

    private String value;

    @JsonValue private final String kr;
}
