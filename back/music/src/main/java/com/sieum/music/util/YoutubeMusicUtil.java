package com.sieum.music.util;

import static com.sieum.music.exception.CustomExceptionStatus.NOT_FOUND_KEY_WORD;

import com.sieum.music.dto.response.SearchSongResponse;
import com.sieum.music.exception.BadRequestException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.util.HtmlUtils;

@Component
@Slf4j
public class YoutubeMusicUtil {
    @Value("${youtube.api-key}")
    String apiKey;

    public List<SearchSongResponse> searchSongInYoutube(String keyword) {
        StringBuilder url =
                new StringBuilder(
                        "https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=video&videoCategoryId=10&maxResults=25");
        url.append("&key=" + apiKey);
        try {
            String encodedKeyword = URLEncoder.encode(keyword + " topic auto-generated", "UTF-8");
            url.append("&q=" + encodedKeyword);
        } catch (UnsupportedEncodingException e) {
            throw new BadRequestException(NOT_FOUND_KEY_WORD);
        }

        List<SearchSongResponse> musicList = new ArrayList<>();
        try {
            JSONParser jspa = new JSONParser();
            JSONObject jsob =
                    (JSONObject)
                            jspa.parse(
                                    new BufferedReader(
                                            new InputStreamReader(
                                                    new URL(url.toString()).openStream(),
                                                    StandardCharsets.UTF_8)));
            JSONArray jsonArray = (JSONArray) jsob.get("items");
            for (Object object : jsonArray) {
                JSONObject jsonObject = (JSONObject) object;
                JSONObject id = (JSONObject) jsonObject.get("id");
                String youtubeId = (String) id.get("videoId");
                JSONObject snippet = (JSONObject) jsonObject.get("snippet");
                String inputTitle = (String) snippet.get("title");
                String title = HtmlUtils.htmlUnescape(inputTitle);
                String artist = (String) snippet.get("channelTitle");

                if (artist.contains("Topic")) {
                    artist = artist.substring(0, artist.length() - 8);
                }

                JSONObject thumbnails = (JSONObject) snippet.get("thumbnails");
                JSONObject high = (JSONObject) thumbnails.get("high");
                String albumImg = (String) high.get("url");

                musicList.add(
                        SearchSongResponse.builder()
                                .youtubeId(youtubeId)
                                .title(title)
                                .albumImage(albumImg)
                                .artist(artist)
                                .playTime("tmp")
                                .build());
            }
            url.setLength(0);
        } catch (IOException | ParseException e) {
            throw new BadRequestException(NOT_FOUND_KEY_WORD);
        }
        return musicList;
    }
}
