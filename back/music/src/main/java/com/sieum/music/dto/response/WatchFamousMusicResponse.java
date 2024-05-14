package com.sieum.music.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Schema(description = "popular music in the legal dong where one's current location belongs")
public class WatchFamousMusicResponse {

    @Schema(description = "thrown music ID", example = "1")
    Long id;

    @Schema(description = "thrown music title", example = "Hype Boy")
    String title;

    @Schema(description = "artist name", example = "NewJeans")
    String name;

    @Schema(
            description = "album image URL",
            example = "https://i.scdn.co/image/ab67616d0000b2739d28fd01859073a3ae6ea209")
    String albumImage;

    @Schema(description = "youtube ID", example = "0a4MMyCrzT0En247IhqZbD")
    String youtubeId;

    @Schema(description = "thrown song comment", example = "I like NewJeans")
    String content;
}
