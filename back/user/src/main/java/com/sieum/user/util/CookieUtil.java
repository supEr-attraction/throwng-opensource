package com.sieum.user.util;

import com.sieum.user.infrastructure.JwtProvider;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CookieUtil {

    private JwtProvider jwtProvider;

    public Cookie createCookie(String cookieName, String value) {
        Cookie token = new Cookie(cookieName, value);
        token.setHttpOnly(true);
        token.setSecure(true);
        token.setMaxAge(jwtProvider.getRefreshTokenExpiryDate());
        token.setPath("/");
        return token;
    }

    public Cookie setRefreshToken(String value) {
        Cookie cookie = new Cookie("refresh-token", value);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge(jwtProvider.getRefreshTokenExpiryDate());
        cookie.setPath("/");
        return cookie;
    }

    public void setRefreshToken(HttpServletResponse response, String value) {
        ResponseCookie cookie =
                ResponseCookie.from("refresh-token", value)
                        .path("/")
                        .sameSite("None")
                        .httpOnly(false)
                        .secure(true)
                        .maxAge(jwtProvider.getRefreshTokenExpiryDate())
                        .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    public Cookie getCookie(HttpServletRequest req, String cookieName) {
        final Cookie[] cookies = req.getCookies();
        if (cookies == null) return null;
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(cookieName)) return cookie;
        }
        return null;
    }
}
