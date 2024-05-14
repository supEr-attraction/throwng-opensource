package com.sieum.notification.repository;

import com.sieum.notification.domain.CouponNotificationLog;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CouponNotificationLogRepository
        extends MongoRepository<CouponNotificationLog, String> {

    List<CouponNotificationLog> findAllByUserId(final long userId);
}
