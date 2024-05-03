package com.sieum.user.util;

import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ClientIpUtil {
    public static String getClientIP(HttpServletRequest request) {
        String clientIp = request.getHeader("X-Forwarded-For");
        log.info("X-FORWARDED-FOR : " + clientIp);

        if (clientIp == null) {
            clientIp = request.getHeader("Proxy-Client-IP");
            log.info("Proxy-Client-IP : " + clientIp);
        }
        if (clientIp == null) {
            clientIp = request.getHeader("WL-Proxy-Client-IP");
            log.info("WL-Proxy-Client-IP : " + clientIp);
        }
        if (clientIp == null) {
            clientIp = request.getHeader("HTTP_CLIENT_IP");
            log.info("HTTP_CLIENT_IP : " + clientIp);
        }
        if (clientIp == null) {
            clientIp = request.getHeader("HTTP_X_FORWARDED_FOR");
            log.info("HTTP_X_FORWARDED_FOR : " + clientIp);
        }
        if (clientIp == null) {
            clientIp = request.getRemoteAddr();
            log.info("getRemoteAddr : " + clientIp);
        }
        log.info("Result : IP Address : " + clientIp);

        return clientIp;
    }
}
