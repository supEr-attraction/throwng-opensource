package com.sieum.user.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@Schema(description = "Count my notification history")
public class NotificationHistoryResponse {

    @Schema(description = "category")
    private String category;

    @Schema(description = "notification sending date")
    private LocalDateTime date;

    @Schema(description = "title")
    private String title;

    @Schema(description = "body")
    private String body;

    @Schema(description = "link")
    private String link;
}
