package com.sieum.quiz.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum QuizType {
    MULTIPLE("객관식"),
    SUBJECTIVE("주관식"),
    OX("OX");

    private String value;
}
