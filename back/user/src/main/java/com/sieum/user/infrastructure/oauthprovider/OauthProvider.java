package com.sieum.user.infrastructure.oauthprovider;

import com.sieum.user.infrastructure.oauthuserinfo.OauthUserInfo;
import org.springframework.web.client.RestTemplate;

public interface OauthProvider {
    RestTemplate restTemplate = new RestTemplate();

    boolean is(String name);

    OauthUserInfo getUserInfo(String code);

    void disconnectAccount(String socialId);
}
