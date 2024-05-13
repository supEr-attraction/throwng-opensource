package com.sieum.user.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@Schema(description = "Return user fcm information")
public class UserFcmInfoResponse {

    @Schema(description = "userId")
    private long userId;

    @Schema(description = "fcm token")
    private String fcmToken;
}
