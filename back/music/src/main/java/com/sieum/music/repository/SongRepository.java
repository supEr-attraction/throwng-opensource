package com.sieum.music.repository;

import com.sieum.music.domain.Song;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song, Integer> {
    boolean existsByYoutubeId(String youtubeId);

    Song findByTitle(String title);

    Optional<Song> findByYoutubeId(String youtubeId);
}
