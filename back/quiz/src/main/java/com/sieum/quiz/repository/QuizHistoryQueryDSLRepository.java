package com.sieum.quiz.repository;

import static com.sieum.quiz.domain.QQuizHistory.quizHistory;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sieum.quiz.dto.response.QuizHistoryResponse;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class QuizHistoryQueryDSLRepository {

    private final JPAQueryFactory queryFactory;
    private final long DEFAULT_DELETE_DAY = 7L;

    public List<QuizHistoryResponse> findSolvedAtQuizHistory(
            final long userId, final LocalDateTime createdAt) {

        return queryFactory
                .select(
                        Projections.fields(
                                QuizHistoryResponse.class,
                                Expressions.stringTemplate(
                                                "DATE_FORMAT({0}, {1})",
                                                quizHistory.createdAt, "%Y/%m/%d")
                                        .as("solvedAt")))
                .distinct()
                .from(quizHistory)
                .where(quizHistory.userId.eq(userId), quizHistory.createdAt.goe(createdAt))
                .fetch();
    }
}
