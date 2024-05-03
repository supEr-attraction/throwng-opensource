package com.sieum.user.common;

public enum CustomExceptionStatus {
    INTERNAL_SERVER_ERROR("InternalServer_500_1", "Server error"),
    REQUEST_ERROR("NotValidInput_400_2", "Invalid input"),
    INVALID_REQUEST("BadRequest_400_1", "Invalid request"),
    NOT_SUPPORTED_OAUTH_SERVICE("User_400_1", "This OAuth service is not available"),
    INVALID_AUTHORIZATION_CODE("User_400_2", "Invalid authentication code"),
    FAILED_TO_DISCONNECT_SOCIAL(
            "User_400_3", "You failed to disconnect from the social account you signed up for"),
    NOT_AUTHENTICATED_ACCOUNT("User_400_4", "A login is required"),
    ACCOUNT_ACCESS_DENIED("User_400_5", "You do not have permission"),
    FAIL_TO_GENERATE_RANDOM_NICKNAME("User_400_6", "Failed to create random nicknames"),
    NOT_FOUND_ACCOUNT("User_400_7", "This account does not exist."),
    NOT_FOUND_LEVEL("User_400_8", "This level does not exist."),
    VIOLATE_ACCOUNT("User_400_9", "This account is in violation of regulations");

    private final String code;
    private final String message;

    private CustomExceptionStatus(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
