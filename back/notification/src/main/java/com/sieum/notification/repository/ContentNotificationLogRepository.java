package com.sieum.notification.repository;

import com.sieum.notification.domain.ContentNotificationLog;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContentNotificationLogRepository
        extends MongoRepository<ContentNotificationLog, Long> {
    List<ContentNotificationLog> findAllByUserId(final long userId);
}
