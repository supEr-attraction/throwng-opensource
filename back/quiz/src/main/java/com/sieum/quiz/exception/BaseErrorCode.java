package com.sieum.quiz.exception;

import com.sieum.quiz.dto.ErrorReason;

public interface BaseErrorCode {
    public ErrorReason getErrorReason();
}
