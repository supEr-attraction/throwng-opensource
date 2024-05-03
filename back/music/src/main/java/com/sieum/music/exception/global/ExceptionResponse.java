package com.sieum.music.exception.global;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ExceptionResponse {
    private final String code;
    private final String message;
}
