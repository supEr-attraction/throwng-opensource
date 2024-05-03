package com.sieum.user.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MemberTokens {
    private final String refreshToken;
    private final String accessToken;
}
