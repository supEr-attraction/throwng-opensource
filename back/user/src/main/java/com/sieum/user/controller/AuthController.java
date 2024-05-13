package com.sieum.user.controller;

import static org.springframework.http.HttpHeaders.SET_COOKIE;
import static org.springframework.http.HttpStatus.CREATED;

import com.sieum.user.domain.User;
import com.sieum.user.dto.MemberTokens;
import com.sieum.user.dto.response.AccessTokenResponse;
import com.sieum.user.dto.response.TokenInfoResponse;
import com.sieum.user.service.LoginService;
import com.sieum.user.service.MyUserDetailsService;
import com.sieum.user.service.UserService;
import com.sieum.user.util.ClientIpUtil;
import com.sieum.user.util.CookieUtil;
import com.sieum.user.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    public static final int COOKIE_AGE_SECONDS = 604800;

    private final LoginService loginService;
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final MyUserDetailsService myUserDetailsService;
    private final ClientIpUtil clientIpUtil;
    private final CookieUtil cookieUtil;

    @GetMapping("/login/{provider}")
    public ResponseEntity<AccessTokenResponse> login(
            HttpServletRequest request,
            @PathVariable final String provider,
            @RequestParam("code") String code,
            final HttpServletResponse response) {
        final User user = loginService.login(provider, code);

        userService.createUserHistory(ClientIpUtil.getClientIP(request), user);

        final MemberTokens memberTokens = jwtUtil.createJwtToken(user);
        final ResponseCookie cookie =
                ResponseCookie.from("refresh-token", memberTokens.getRefreshToken())
                        .maxAge(COOKIE_AGE_SECONDS)
                        .sameSite("None")
                        .secure(true)
                        .httpOnly(true)
                        .path("/")
                        .build();
        response.addHeader(SET_COOKIE, cookie.toString());

        UserDetails userDetails = myUserDetailsService.loadUserByUsername(user.getSocialId());
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
        usernamePasswordAuthenticationToken.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

        return ResponseEntity.status(CREATED)
                .body(new AccessTokenResponse(memberTokens.getAccessToken()));
    }

    @Operation(summary = "feign client")
    @GetMapping("/id")
    public ResponseEntity getUserId(@RequestHeader("Authorization") String accessToken) {
        return ResponseEntity.ok(loginService.getUsername(accessToken));
    }

    //    @Operation(summary = "feign client")
    //    @GetMapping("/violation")
    //    public ResponseEntity<?> getLimitAccount(@RequestHeader("Authorization") String
    // accessToken) {
    //        long userId = loginService.getUsername(accessToken);
    //        return ResponseEntity.ok(userService.getLimitAccount(userId));
    //    }

    @Operation(summary = "feign client")
    @GetMapping("/violation")
    public ResponseEntity<?> getLimitAccount(@RequestHeader("Authorization") String accessToken) {
        long userId = loginService.getUsername(accessToken);
        return ResponseEntity.ok(userService.getLimitAccount(userId));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> updateRefreshToken(
            HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = cookieUtil.getCookie(request, "refresh-token").getValue();
        TokenInfoResponse tokenResponse = loginService.execute(refreshToken);

        if (tokenResponse.isExistRefreshToken()) {
            cookieUtil.setRefreshToken(response, tokenResponse.getRefreshToken());
        }
        return ResponseEntity.ok(tokenResponse);
    }
}
