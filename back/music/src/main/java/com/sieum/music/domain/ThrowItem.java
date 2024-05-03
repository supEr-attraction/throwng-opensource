package com.sieum.music.domain;

import com.sieum.music.domain.enums.ThrowStatus;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ThrowItem extends CreatedTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "throw_item_id")
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

    @NotNull private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "zipcode_id")
    @NotNull
    private Zipcode zipcode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_id")
    @NotNull
    private Song song;

    @OneToMany(mappedBy = "throwItem", cascade = CascadeType.REMOVE)
    private List<ThrowHistory> throwHistoryList = new ArrayList<>();

    public void changeThrowStatus(final String status) {
        this.status = ThrowStatus.valueOf(status);
    }
}
