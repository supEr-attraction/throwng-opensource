package com.sieum.notification.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import javax.validation.constraints.NotNull;
import lombok.*;
import org.springframework.validation.annotation.Validated;

@Getter
@Builder
@Validated
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {

    @NotNull(message = "userId is required")
    @Schema(description = "user id")
    private Long userId;

    @NotNull(message = "userFcm is required")
    @Schema(description = "user fcm token")
    private String fcmToken;
}
