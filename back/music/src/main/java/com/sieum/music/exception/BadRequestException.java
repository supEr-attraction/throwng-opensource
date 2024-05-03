package com.sieum.music.exception;

import lombok.Getter;

@Getter
public class BadRequestException extends RuntimeException {
    private final String code;
    private final String message;

    public BadRequestException(final CustomExceptionStatus customExceptionStatus) {
        this.code = customExceptionStatus.getCode();
        this.message = customExceptionStatus.getReason();
    }
}
