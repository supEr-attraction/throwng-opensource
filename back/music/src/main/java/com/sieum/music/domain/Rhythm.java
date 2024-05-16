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
public class Rhythm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rhythm_id")
    private Integer id;

    @Column(name = "title", length = 400)
    @NotNull
    private String title;

    @Column(name = "preview_url", length = 200)
    @NotNull
    private String previewUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artist_id")
    @NotNull
    private Artist artist;
}
