package com.sieum.music.repository;

import com.sieum.music.domain.ThrowHistory;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThrowHistoryRepository extends JpaRepository<ThrowHistory, Long> {

    boolean existsByUserIdAndThrowItemId(final long userId, final long throwId);

    Long countByUserId(final long userId);

    List<ThrowHistory> findByUserId(final long userId);

    List<ThrowHistory> findByUserIdAndCreatedAtAfter(
            final long userId, final LocalDateTime createdAt);

    List<ThrowHistory> findByThrowItemId(final long throwId);

    Optional<ThrowHistory> findByUserIdAndThrowItemId(final long userId, final long throwId);
}
