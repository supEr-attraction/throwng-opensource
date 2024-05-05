package com.sieum.music.repository;

import com.sieum.music.domain.Zipcode;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ZipCodeRepository extends JpaRepository<Zipcode, Integer> {
    // Optional<Zipcode> findBySigunguAndDong(String sigungu, String dong);
    Optional<Zipcode> findByCode(String code);
}
