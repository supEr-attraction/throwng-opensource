package com.sieum.music.service;

import com.sieum.music.repository.BatchQueryDSLRepository;
import java.util.AbstractMap;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BatchService {
    private final BatchQueryDSLRepository batchQueryDSLRepository;

    private final float PERCENT = 0.05f;
    private final int MIN_COUNT = 20;

    @Transactional
    public void popularMusic() {
        List<Integer> zipCodeIds = batchQueryDSLRepository.getZipCodeId();
        zipCodeIds.stream()
                .map(
                        zipCodeId -> {
                            long legalDongPickUpCount =
                                    batchQueryDSLRepository.getLegalDongPickUpCount(zipCodeId);
                            return new AbstractMap.SimpleEntry<>(zipCodeId, legalDongPickUpCount);
                        })
                .filter(entry -> entry.getValue() >= MIN_COUNT)
                .forEach(
                        entry -> {
                            int zipCodeId = entry.getKey();
                            long legalDongPickUpCount = entry.getValue();
                            int popularCount = calculatePopularCount(legalDongPickUpCount);
                            List<Long> popularThrowIds =
                                    batchQueryDSLRepository.getPopularThrowItems(
                                            popularCount, zipCodeId);
                            batchQueryDSLRepository.updatePopularMusic(popularThrowIds);
                        });
    }

    private int calculatePopularCount(long legalDongPickUpCount) {
        return (int) (legalDongPickUpCount * PERCENT);
    }
}
