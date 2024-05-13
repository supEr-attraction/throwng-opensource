package com.sieum.quiz.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ErrorReason {
    private final String code;
    private final String reason;
}
