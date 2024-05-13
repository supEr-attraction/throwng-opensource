package com.sieum.user.util;

import java.util.Random;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class CreateOTPUtil {

    private static final Random random = new Random();

    public Integer createOTP() {
        return random.nextInt(900000) + 100000;
    }
}
