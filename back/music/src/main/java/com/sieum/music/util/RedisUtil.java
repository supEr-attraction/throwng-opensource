package com.sieum.music.util;

import java.time.Duration;
import java.util.Collection;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisUtil {

    private final RedisTemplate redisTemplate;

    public Object getObject(String key) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(key);
    }

    public String getData(String key) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(key);
    }

    public Set getKeys(String pattern) {
        return redisTemplate.keys(pattern);
    }

    public void setData(String key, String value) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, value);
    }

    public void setObject(String key, Object object) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, object);
    }

    public void setDataExpire(String key, String value, int duration) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Duration expiredDuration = Duration.ofSeconds(duration);
        valueOperations.set(key, value, expiredDuration);
    }

    public void setObjectExpire(String key, Object object, int duration) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        Duration expiredDuration = Duration.ofSeconds(duration);
        valueOperations.set(key, object, expiredDuration);
    }

    public void deleteData(String key) {
        redisTemplate.delete(key);
    }

    public void deleteDataList(Collection<?> key) {
        redisTemplate.delete(key);
    }
}
