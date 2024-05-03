package com.sieum.music.repository;

import com.sieum.music.domain.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Integer> {
    boolean existsByName(String name);

    Artist findByName(String name);
}
