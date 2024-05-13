package com.sieum.user.infrastructure;

import static com.sieum.user.common.CustomExceptionStatus.NOT_AUTHENTICATED_ACCOUNT;

import com.sieum.user.dto.MemberTokens;
import com.sieum.user.exception.BadRequestException;
import com.sieum.user.util.RedisUtil;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtProvider {
    public static final String EMPTY_SUBJECT = "";

    @Value("${security.jwt.secret-key}")
    private String secretKey;

    @Value("${security.jwt.access-expiration-time}")
    private Long accessExpirationTime;

    @Value("${security.jwt.refresh-expiration-time}")
    private Long refreshExpirationTime;

    private final UserDetailsService userDetailsService;
    private RedisUtil redisUtil;

    public JwtProvider(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    public MemberTokens generateLoginToken(final String socialId, final String subject) {
        final String refreshToken = createToken(socialId, "refreshToken", refreshExpirationTime);
        final String accessToken = createToken(socialId, "accessToken", accessExpirationTime);
        return new MemberTokens(refreshToken, accessToken);
    }

    public MemberTokens generateTokenForWatch(final String socialId) {
        final String refreshToken =
                createToken(socialId, "watchRefreshToken", refreshExpirationTime);
        final String accessToken = createToken(socialId, "watchAccessToken", accessExpirationTime);
        return new MemberTokens(refreshToken, accessToken);
    }

    private String createToken(
            final String socialId, final String subject, final Long validityInMilliseconds) {
        final Date now = new Date();
        final Date validity = new Date(now.getTime() + validityInMilliseconds);

        Claims claims = Jwts.claims();
        claims.put("userId", socialId);

        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String resolveToken(HttpServletRequest req) {
        return req.getHeader("AUTHORIZATION");
    }

    public boolean checkToken(String token) {
        try {
            // Json Web Signature: A tokenization of the server signing authentication information
            // with the server's private key based on authentication
            // setSigningKey : Set secret key for JWS signature verification
            // parseClaimsJws : Create original jws by parsing
            Jws<Claims> claims =
                    Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            log.debug("claims: {}", claims);
            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
    }

    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserId(token));
        return new UsernamePasswordAuthenticationToken(
                userDetails, "", userDetails.getAuthorities());
    }

    public String getUserId(String authorization) {
        Jws<Claims> claims = null;
        try {
            claims =
                    Jwts.parserBuilder()
                            .setSigningKey(secretKey)
                            .build()
                            .parseClaimsJws(authorization);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new BadRequestException(NOT_AUTHENTICATED_ACCOUNT);
        }
        Map<String, Object> value = claims.getBody();
        log.info("value: {}", value);
        return (String) value.get("userId");
    }

    private Key getSigningKey(String secretKey) {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Claims extractAllClaims(String token) throws ExpiredJwtException {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String generateAccessToken(String socialId, String platform) {
        return createToken(socialId, platform, accessExpirationTime);
    }

    public String generateRefreshToken(String socialId, String platform) {
        return createToken(socialId, platform, refreshExpirationTime);
    }

    public Date getExpiredTime(String token) {
        return extractAllClaims(token).getExpiration();
    }

    private void storeRefreshToken(String key, String value) {
        redisUtil.setDataExpire(key, value, refreshExpirationTime.intValue());
    }

    public String issueRefreshToken(String id, String platform) {
        String refreshToken = generateRefreshToken(id, platform);
        storeRefreshToken(id, refreshToken);
        return refreshToken;
    }

    public MemberTokens reissue(String id, String platform, String refreshToken) {
        String accessToken = generateAccessToken(id, platform);

        Date expiredTime = getExpiredTime(refreshToken);
        Date currentTime = new Date();
        if (expiredTime.getTime() - currentTime.getTime() < (refreshExpirationTime / 2)) {
            refreshToken = issueRefreshToken(id, platform);
        } else {
            refreshToken = null;
        }

        return new MemberTokens(refreshToken, accessToken);
    }

    public int getRefreshTokenExpiryDate() {
        return Integer.parseInt(String.valueOf(refreshExpirationTime));
    }
}
