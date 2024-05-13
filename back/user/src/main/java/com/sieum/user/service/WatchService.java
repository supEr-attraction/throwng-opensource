package com.sieum.user.service;

import static com.sieum.user.common.CustomExceptionStatus.NOT_VALID_OTP;

import com.sieum.user.dto.MemberTokens;
import com.sieum.user.dto.request.OTPRequest;
import com.sieum.user.exception.BadRequestException;
import com.sieum.user.infrastructure.JwtProvider;
import com.sieum.user.util.CreateOTPUtil;
import com.sieum.user.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class WatchService {

    private final CreateOTPUtil createOTPUtil;
    private final JwtProvider jwtProvider;
    private final RedisUtil redisUtil;
    private static final int OTP_VALIDITY = 60;
    private static final String TOKEN_SUBJECT = "watch_access_token";

    /*
    Need to think about how to handle retry logic if it fails more than once
     */
    public String createOTP(final String accessToken) {
        final String userId = jwtProvider.getUserId(accessToken);
        final String otp = createOTPUtil.createOTP().toString();
        final String key = redisUtil.getData(otp);
        redisUtil.setDataExpire(otp, userId, OTP_VALIDITY);
        return otp;
    }

    public MemberTokens authenticate(final OTPRequest otpRequest) {
        String value = redisUtil.getData(otpRequest.getOtp());
        if (value == null) {
            log.error("Not valid OTP code");
            throw new BadRequestException(NOT_VALID_OTP);
        }
        return jwtProvider.generateTokenForWatch(value);
    }
}
