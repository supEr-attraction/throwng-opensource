package com.sieum.music.repository;

import com.sieum.music.domain.PlaylistHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistHistoryRepository extends JpaRepository<PlaylistHistory, Long> {}
