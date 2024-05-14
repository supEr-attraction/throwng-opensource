package com.sieum.user.exception;

import com.sieum.user.common.CustomExceptionStatus;
import lombok.Getter;

@Getter
public class FeignClientException extends RuntimeException {
    private final String code;
    private final String message;

    public FeignClientException(final CustomExceptionStatus customExceptionStatus) {
        this.code = customExceptionStatus.getCode();
        this.message = customExceptionStatus.getMessage();
    }
}
