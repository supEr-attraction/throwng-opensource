package com.sieum.notification.exception;

import com.sieum.notification.dto.ErrorReason;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CustomExceptionStatus implements BaseErrorCode {
    INTERNAL_SERVER_ERROR("InternalServer_500_1", "Server error"),
    FCM_SENDING_ERROR("FCMSending_500_2", "FCM sending error"),
    CONVERTING_JSON_ERROR("ConvertingJson_500_3", "Converting Json error"),
    GOOGLE_REQUEST_TOKEN_ERROR("GoogleRequestToken_500_4", "Request google token error"),
    INVALID_REQUEST("BadRequest_400_1", "Invalid request"),
    REQUEST_ERROR("NotValidInput_400_2", "Invalid input");

    private String code;
    private String reason;

    @Override
    public ErrorReason getErrorReason() {
        return ErrorReason.builder().reason(reason).code(code).build();
    }
}
