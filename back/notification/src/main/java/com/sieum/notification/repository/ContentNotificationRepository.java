package com.sieum.notification.repository;

import com.sieum.notification.domain.ContentNotification;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContentNotificationRepository
        extends MongoRepository<ContentNotification, String> {

    ContentNotification findByUsage(final String usage);
}
