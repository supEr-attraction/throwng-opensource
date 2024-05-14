package com.sieum.music.dto.response;

import java.util.ArrayList;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class KakaoMapReverseGeoResponse {
    public Meta meta;
    public ArrayList<Document> documents;

    public class Document {
        public String address_name;
        public String region_1depth_name;
        public String region_2depth_name;
        public String region_3depth_name;
        public String region_4depth_name;
        public String code;
        public Double x;
        public Double y;
    }

    protected class Meta {
        public Integer total_count;
    }
}
