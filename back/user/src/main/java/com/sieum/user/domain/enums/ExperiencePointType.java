package com.sieum.user.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExperiencePointType {
    THROWNG(3),
    PICKUP(1),
    CONTENTS(2);

    private final int point;

    public int getPoint() {
        return point;
    }
}
