package com.sieum.notification.repository;

import com.sieum.notification.domain.CouponNotification;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CouponNotificationRepository extends MongoRepository<CouponNotification, String> {
    CouponNotification findByUsage(final String usage);
}
