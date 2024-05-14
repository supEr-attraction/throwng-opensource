package com.sieum.music.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
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
public class MusicExperienceCountReqeust {

    @Schema(description = "userId")
    @NotNull(message = "userId is required")
    private long userId;

    @Schema(description = "Leveled up date")
    @NotNull(message = "createdAt is required")
    private LocalDateTime createdAt;
}
