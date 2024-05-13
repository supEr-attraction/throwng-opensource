package com.sieum.user.repository;

import com.sieum.user.domain.Level;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LevelRepository extends JpaRepository<Level, Integer> {
    Level findByGrade(final int grade);
}
