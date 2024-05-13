package com.sieum.user.repository;

import com.sieum.user.domain.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findBySocialId(String socialLoginId);

    boolean existsByNickName(String nickname);

    List<User> findByFcmTokenIsNotNull();
}
