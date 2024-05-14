package com.sieum.quiz.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@Table(name = "coupon")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Coupon extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "coupon_id")
    private Long id;

    @Column(length = 20)
    @NotNull
    private String couponType;

    @Column(length = 20)
    @NotNull
    private String route;

    @NotNull private Long userId;
}
