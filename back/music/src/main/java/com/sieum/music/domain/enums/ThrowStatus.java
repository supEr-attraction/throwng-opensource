package com.sieum.music.domain.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ThrowStatus {
    VISIBLE("VISIBLE", "정상"),
    HIDDEN("HIDDEN", "삭제"),
    COMPLAINT("COMPLAINT", "신고");

    private String value;

    @JsonValue private final String kr;
}
