package com.sieum.user.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@Table(name = "user_history")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class UserHistory extends LoginTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_history_id")
    private Long id;

    @Column(name = "ip", length = 40)
    @NotNull
    private String ip;

    @Column(name = "device_token", length = 100)
    private String deviceToken;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @NotNull
    private User user;
}
