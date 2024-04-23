package com.sieum.music.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Zipcode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "zipcode_id")
    private int zipcodeId;

    @Column(length = 10)
    @NotNull
    private String code;

    @Column(length = 10)
    private String sido;

    @Column(length = 10)
    private String sigungu;

    @Column(length = 10)
    private String dong;
}
