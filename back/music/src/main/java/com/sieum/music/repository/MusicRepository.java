package com.sieum.music.repository;

import com.sieum.music.domain.ThrowItem;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepository extends JpaRepository<ThrowItem, Long> {
    Long countByUserId(final long userId);

    List<ThrowItem> findByUserId(final long userId);

    List<ThrowItem> findByUserIdAndCreatedAtAfter(final long userId, final LocalDateTime createdAt);
}
