package com.sieum.quiz.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Getter
@Builder
@Validated
@NoArgsConstructor
@AllArgsConstructor
public class CouponNotificationRequest {

    @NotNull(message = "userId is required")
    @Schema(description = "user id")
    private Long userId;

    @NotNull(message = "userFcm is required")
    @Schema(description = "user fcm token")
    private String fcmToken;
}
