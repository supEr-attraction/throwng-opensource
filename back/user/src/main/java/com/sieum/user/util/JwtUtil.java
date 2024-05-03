package com.sieum.user.util;

import com.sieum.user.domain.User;
import com.sieum.user.dto.MemberTokens;
import com.sieum.user.infrastructure.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtUtil {
    private final RedisUtil redisUtil;
    private final JwtProvider jwtProvider;

    public MemberTokens createJwtToken(User user) {
        MemberTokens memberTokens = jwtProvider.generateLoginToken(user.getSocialId(), "");
        redisUtil.setData(user.getSocialId(), memberTokens.getRefreshToken());
        return memberTokens;
    }
}
