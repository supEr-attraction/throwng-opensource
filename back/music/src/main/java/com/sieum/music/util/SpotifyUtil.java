package com.sieum.music.util;

import static com.sieum.music.exception.CustomExceptionStatus.SPOTIFY_CONNECTION_ERROR;
import static com.sieum.music.exception.CustomExceptionStatus.SPOTIFY_SEARCH_ERROR;

import com.sieum.music.dto.response.SearchSongResponse;
import com.sieum.music.exception.BadRequestException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.apache.hc.core5.http.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;
import se.michaelthelin.spotify.requests.data.search.simplified.SearchTracksRequest;

@Component
@Slf4j
public class SpotifyUtil {

    @Value("${spotify.client-id}")
    private String clientId;

    @Value("${spotify.client-secret}")
    private String clientSecret;

    private SpotifyApi spotifyApi;

    @PostConstruct
    public void init() {
        this.spotifyApi =
                new SpotifyApi.Builder()
                        .setClientId(clientId)
                        .setClientSecret(clientSecret)
                        .build();
    }

    public void accessToken() {
        ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials().build();
        try {
            final ClientCredentials clientCredentials = clientCredentialsRequest.execute();
            spotifyApi.setAccessToken(clientCredentials.getAccessToken());
            System.out.println("Expires in: " + clientCredentials.getExpiresIn());
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            throw new BadRequestException(SPOTIFY_CONNECTION_ERROR);
        }
    }

    public List<SearchSongResponse> searchSongInSpotify(final String keyword) {
        accessToken();

        final List<SearchSongResponse> musicList = new ArrayList<>();
        final SearchTracksRequest searchTracksRequest =
                spotifyApi.searchTracks(keyword).limit(20).offset(0).build();

        try {
            final List<Track> trackPaging = Arrays.asList(searchTracksRequest.execute().getItems());

            trackPaging.stream()
                    .filter(track -> track.getAlbum().getImages().length > 0)
                    .map(
                            track -> {
                                return SearchSongResponse.builder()
                                        .title(track.getName())
                                        .albumImage(track.getAlbum().getImages()[0].getUrl())
                                        .artist(track.getArtists()[0].getName())
                                        .playTime(
                                                track.getDurationMs() / 60000
                                                        + ":"
                                                        + (track.getDurationMs() % 60000) / 1000)
                                        .youtubeId(track.getId())
                                        .build();
                            })
                    .forEach(musicList::add);

        } catch (IOException | SpotifyWebApiException | ParseException e) {
            throw new BadRequestException(SPOTIFY_SEARCH_ERROR);
        }

        return musicList;
    }
}
