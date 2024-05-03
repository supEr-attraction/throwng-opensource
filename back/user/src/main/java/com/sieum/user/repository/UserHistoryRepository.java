package com.sieum.user.repository;

import com.sieum.user.domain.UserHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserHistoryRepository extends JpaRepository<UserHistory, Long> {}
