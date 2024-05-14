package com.sieum.music.repository;

import com.sieum.music.domain.Playlist;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistRepository extends JpaRepository<Playlist, Integer> {
    Optional<Playlist> findByUserIdAndSongIdAndStatus(
            final long userId, final int songId, final boolean status);

    Optional<Playlist> findByIdAndUserId(final int playlistId, final long userId);

    List<Playlist> findTop50ByUserIdOrderByIdDesc(final long userId);
}
