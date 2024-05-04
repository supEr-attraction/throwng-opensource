package com.sieum.music.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReverseGeoResponse {

    String regionName; // gu and dong
    String code;

    public static ReverseGeoResponse of(
            final KakaoMapReverseGeoResponse kakaoMapReverseGeoResponse) {
        return builder()
                .regionName(
                        kakaoMapReverseGeoResponse.getDocuments().get(0).region_2depth_name
                                + " "
                                + kakaoMapReverseGeoResponse
                                        .getDocuments()
                                        .get(0)
                                        .region_3depth_name)
                .code(kakaoMapReverseGeoResponse.getDocuments().get(0).code)
                .build();
    }
}
