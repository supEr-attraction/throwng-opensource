package com.sieum.music.util;

import com.google.gson.Gson;
import com.sieum.music.dto.response.KakaoMapReverseGeoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class KakaoMapReverseGeoUtil {

    @Value("${kakao.reverse.geo.url}")
    private String reverseGeoUri;

    @Value("${kakao.admin-key}")
    private String adminKey;

    public KakaoMapReverseGeoResponse getReverseGeo(final Double lat, final Double lon) {
        UriComponents uri =
                UriComponentsBuilder.newInstance()
                        .fromHttpUrl(reverseGeoUri)
                        .queryParam("x", lon)
                        .queryParam("y", lat)
                        .build();

        final HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", String.format("KakaoAK %s", adminKey));
        final HttpEntity<MultiValueMap<String, String>> userInfoRequestEntity =
                new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity requestMessage = new HttpEntity(headers);
        ResponseEntity response =
                restTemplate.exchange(
                        uri.toUriString(), HttpMethod.GET, requestMessage, String.class);

        Gson gson = new Gson();
        return gson.fromJson(response.getBody().toString(), KakaoMapReverseGeoResponse.class);
    }
}
