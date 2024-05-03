package com.sieum.music.repository;

import com.sieum.music.domain.ThrowHistory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThrowHistoryRepository extends JpaRepository<ThrowHistory, Long> {

    boolean existsByUserIdAndThrowItemId(final long userId, final long throwId);

    Long countByUserId(final long userId);

    List<ThrowHistory> findByUserId(final long userId);
}
