package com.sieum.music.repository;

import com.sieum.music.domain.Artist;
import com.sieum.music.domain.Rhythm;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RhythmRepository extends JpaRepository<Rhythm, Integer> {
    @Query("select distinct rt.artist from Rhythm rt")
    List<Artist> findDistinctByArtistId();

    List<Rhythm> findAllByArtist(final Artist artist);
}
