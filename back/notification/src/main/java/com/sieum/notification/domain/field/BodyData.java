package com.sieum.notification.domain.field;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class BodyData {

    private String link;
    private String title;
    private String body;
    private String image;
}
