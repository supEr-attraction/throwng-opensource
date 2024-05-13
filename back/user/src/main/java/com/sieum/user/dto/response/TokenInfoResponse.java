package com.sieum.user.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TokenInfoResponse {

    @JsonIgnore private String refreshToken;

    private String accessToken;

    public static TokenInfoResponse of(String refreshToken, String accessToken) {
        return new TokenInfoResponse(refreshToken, accessToken);
    }

    public Boolean isExistRefreshToken() {
        return (refreshToken != null);
    }
}
