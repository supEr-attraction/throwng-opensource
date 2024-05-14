package com.sieum.user.domain;

import javax.persistence.*;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@Table(name = "level")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Level {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "level_id")
    private int id;

    @Column(name = "grade")
    private int grade;

    @Column(name = "name", length = 20)
    private String name;

    @Column(name = "throwng_limit")
    private int throwngLimit;

    @Column(name = "next_point")
    private int nextPoint;
}
