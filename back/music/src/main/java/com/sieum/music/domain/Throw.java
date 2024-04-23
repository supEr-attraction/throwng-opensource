package com.sieum.music.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.geo.Point;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Throw extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "throw_id")
    private Long id;

    @Column(length = 50)
    @NotNull
    private String content;

    @Column(length = 200)
    private String itemImage;

    @Column(length = 10)
    @Enumerated(EnumType.STRING)
    @NotNull
    private ThrowStatus status;

    @NotNull private Point locationPoint;

    @NotNull private Integer userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "zipcode_id")
    @NotNull
    private Zipcode zipcode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_id")
    @NotNull
    private Song song;

    public void changeThrowStatus(String status) {
        this.status = ThrowStatus.valueOf(status);
    }
}
