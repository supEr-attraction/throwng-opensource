package com.sieum.user.util;

import static com.sieum.user.common.CustomExceptionStatus.NOT_AUTHENTICATED_ACCOUNT;

import com.sieum.user.config.security.CustomUserDetails;
import com.sieum.user.exception.AuthException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationUtil {
    public static String getCurrentUserSocialId() {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof String) {
            throw new AuthException(NOT_AUTHENTICATED_ACCOUNT);
        }

        CustomUserDetails currentUser = (CustomUserDetails) principal;

        return currentUser.getUsername();
    }
}
