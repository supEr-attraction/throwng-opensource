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
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "song_id")
    private Integer id;

    @Column(name = "youtube_id", length = 100)
    @NotNull
    private String youtubeId;

    @Column(length = 400)
    @NotNull
    private String title;

    @Column(length = 200)
    @NotNull
    private String albumImage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artist_id")
    @NotNull
    private Artist artist;
}
