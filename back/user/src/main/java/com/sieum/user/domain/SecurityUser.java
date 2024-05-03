package com.sieum.user.domain;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

public class SecurityUser extends User {
    private static final long serialVersionUiD = 1L;

    public SecurityUser(com.sieum.user.domain.User user) {
        super(user.getId().toString(), "{noop}", AuthorityUtils.createAuthorityList("ROLE_USER"));
    }
}
