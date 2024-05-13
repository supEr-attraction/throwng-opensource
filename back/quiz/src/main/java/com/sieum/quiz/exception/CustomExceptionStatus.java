package com.sieum.quiz.exception;

import com.sieum.quiz.dto.ErrorReason;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CustomExceptionStatus implements BaseErrorCode {
    INTERNAL_SERVER_ERROR("InternalServer_500_1", "Server error"),
    INVALID_REQUEST("BadRequest_400_1", "Invalid request"),
    REQUEST_ERROR("NotValidInput_400_2", "Invalid input"),
    DUPLICATE_COUPON_REQUEST(
            "CouponDuplicationError_400_3", "Get a coupon once a day through contents"),
    INVALID_COUPON_ROUTE("CouponRouteError_400_4", "Wrong coupon route"),
    INVALID_QUIZ_ID("QuizIdError_400_5", "Invalid quiz id"),
    NOT_TODAY_QUIZ_ID("QuizIdError_400_6", "Not today's quiz id"),
    NOT_MATCH_COUPON_USER("CouponValidationError_400_1", "Coupon issuer and user do not match"),
    NOT_FOUND_COUPON_ID("CouponValidationError_400_2", "Coupon ID not found"),
    NOT_USE_COUPON_STATUS("CouponValidationError_400_3", "The status of the coupon is unavailable"),
    NOT_MATCH_COUPON_TYPE("CouponValidationError_400_4", "This coupon cannot be used"),
    NOT_FOUND_REDIS_COUPON_TYPE_KEY(
            "CouponValidationError_400_5", "Not found redis key about coupon type");

    private String code;
    private String reason;

    @Override
    public ErrorReason getErrorReason() {
        return ErrorReason.builder().reason(reason).code(code).build();
    }
}
