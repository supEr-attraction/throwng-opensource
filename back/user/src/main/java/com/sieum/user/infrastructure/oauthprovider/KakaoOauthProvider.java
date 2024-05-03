package com.sieum.user.infrastructure.oauthprovider;

import static com.sieum.user.common.CustomExceptionStatus.*;
import static java.lang.Boolean.TRUE;

import com.sieum.user.dto.OauthAccessToken;
import com.sieum.user.exception.AuthException;
import com.sieum.user.infrastructure.oauthuserinfo.KakaoUserInfo;
import com.sieum.user.infrastructure.oauthuserinfo.OauthUserInfo;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpStatusCodeException;

@Component
public class KakaoOauthProvider implements OauthProvider {
    private static final String PROPERTIES_PATH = "${oauth2.provider.kakao.";
    private static final String PROVIDER_NAME = "KAKAO";
    private static final String SECURE_RESOURCE = "secure_resource";

    protected final String clientId;
    protected final String clientSecret;
    protected final String redirectUri;
    protected final String tokenUri;
    protected final String userUri;
    protected final String unLinkUri;
    protected final String adminKey;

    public KakaoOauthProvider(
            @Value(PROPERTIES_PATH + "client-id}") final String clientId,
            @Value(PROPERTIES_PATH + "client-secret}") final String clientSecret,
            @Value(PROPERTIES_PATH + "redirect-uri}") final String redirectUri,
            @Value(PROPERTIES_PATH + "token-uri}") final String tokenUri,
            @Value(PROPERTIES_PATH + "user-info}") final String userUri,
            @Value(PROPERTIES_PATH + "unlink-uri}") final String unLinkUri,
            @Value(PROPERTIES_PATH + "admin-key}") final String adminKey) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.tokenUri = tokenUri;
        this.userUri = userUri;
        this.unLinkUri = unLinkUri;
        this.adminKey = adminKey;
    }

    @Override
    public boolean is(final String name) {
        return PROVIDER_NAME.equals(name);
    }

    @Override
    public OauthUserInfo getUserInfo(final String code) {
        final String accessToken = requestAccessToken(code);
        final HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        final HttpEntity<MultiValueMap<String, String>> userInfoRequestEntity =
                new HttpEntity<>(headers);

        final Map<String, Boolean> queryParam = new HashMap<>();
        queryParam.put(SECURE_RESOURCE, TRUE);

        final ResponseEntity<KakaoUserInfo> response =
                restTemplate.exchange(
                        userUri,
                        HttpMethod.GET,
                        userInfoRequestEntity,
                        KakaoUserInfo.class,
                        queryParam);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        }
        throw new AuthException(NOT_SUPPORTED_OAUTH_SERVICE);
    }

    private String requestAccessToken(final String code) {
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        final MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");
        final HttpEntity<MultiValueMap<String, String>> accessTokenRequestEntity =
                new HttpEntity<>(params, headers);

        final ResponseEntity<OauthAccessToken> accessTokenResponse =
                restTemplate.exchange(
                        tokenUri,
                        HttpMethod.POST,
                        accessTokenRequestEntity,
                        OauthAccessToken.class);

        return Optional.ofNullable(accessTokenResponse.getBody())
                .orElseThrow(() -> new AuthException(INVALID_AUTHORIZATION_CODE))
                .getAccessToken();
    }

    public void disconnectAccount(String socialId) {

        final HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + adminKey);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        final MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("target_id_type", "user_id");
        params.add("target_id", socialId);

        final HttpEntity<MultiValueMap<String, String>> requestEntity =
                new HttpEntity<>(params, headers);

        ResponseEntity<String> entity = null;
        try {
            entity = restTemplate.exchange(unLinkUri, HttpMethod.POST, requestEntity, String.class);
        } catch (HttpStatusCodeException exception) {
            int statusCode = exception.getStatusCode().value();
            throw new AuthException(FAILED_TO_DISCONNECT_SOCIAL);
        }
    }
}
