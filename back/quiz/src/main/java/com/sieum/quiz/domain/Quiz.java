package com.sieum.quiz.domain;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import java.util.Map;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

@Entity
@Builder
@AllArgsConstructor
@Table(name = "quiz")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@TypeDef(name = "json", typeClass = JsonType.class)
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_id")
    private Long id;

    @Column(length = 500)
    @NotNull
    private String question;

    @Column(length = 100)
    @NotNull
    private String answer;

    @Column(name = "quiz_type", length = 15)
    private String quizType;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private Map<String, Object> choice;

    @Column(length = 200)
    private String quizImage;

    @Column(length = 200)
    private String previewUrl;
}
