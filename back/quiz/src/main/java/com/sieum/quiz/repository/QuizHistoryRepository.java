package com.sieum.quiz.repository;

import com.sieum.quiz.domain.QuizHistory;
import java.time.LocalDateTime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizHistoryRepository extends JpaRepository<QuizHistory, Long> {

    boolean existsByCreatedAtAfterAndUserId(final LocalDateTime localDateTime, final long userId);
}
