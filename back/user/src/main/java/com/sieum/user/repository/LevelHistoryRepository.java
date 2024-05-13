package com.sieum.user.repository;

import com.sieum.user.domain.LevelHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LevelHistoryRepository extends JpaRepository<LevelHistory, Long> {
    LevelHistory findTopByUserIdOrderByCreatedAtDesc(final long userId);
}
