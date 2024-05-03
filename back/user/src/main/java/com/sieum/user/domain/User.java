package com.sieum.user.domain;

import javax.persistence.*;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@Table(name = "user")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class User extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "social_id", unique = true, length = 100)
    private String socialId;

    @Column(length = 20)
    private String name;

    @Column(name = "nick_name", length = 15)
    private String nickName;

    @Column(length = 10)
    private String platform;

    @Column(length = 10)
    private String level;

    @Column(length = 10)
    private String violation;

    @Column(name = "fcm_token", length = 50)
    private String fcmToken;

    @Column(name = "is_sign_in")
    private boolean isSignIn;
}
