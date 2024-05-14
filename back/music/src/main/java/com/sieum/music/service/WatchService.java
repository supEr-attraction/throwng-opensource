package com.sieum.music.service;

import static com.sieum.music.exception.CustomExceptionStatus.*;

import com.sieum.music.controller.feign.TokenAuthClient;
import com.sieum.music.domain.*;
import com.sieum.music.domain.enums.ThrowStatus;
import com.sieum.music.dto.request.WatchThrownItemRequest;
import com.sieum.music.dto.response.KakaoMapReverseGeoResponse;
import com.sieum.music.dto.response.UserLevelInfoResponse;
import com.sieum.music.dto.response.WatchFamousMusicResponse;
import com.sieum.music.dto.response.WatchPlaylistItemResponse;
import com.sieum.music.exception.BadRequestException;
import com.sieum.music.repository.*;
import com.sieum.music.util.GeomUtil;
import com.sieum.music.util.KakaoMapReverseGeoUtil;
import com.sieum.music.util.LocalDateUtil;
import com.sieum.music.util.RedisUtil;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class WatchService {

    private final MusicRepository musicRepository;
    private final TokenAuthClient tokenAuthClient;
    private final PlaylistRepository playlistRepository;
    private final PlaylistHistoryRepository playlistHistoryRepository;
    private final SongRepository songRepository;
    private final ZipCodeRepository zipCodeRepository;
    private final ThrowHistoryRepository throwHistoryRepository;
    private final ThrowQueryDSLRepository throwQueryDSLRepository;
    private final LocalDateUtil localDateUtil;
    private final RedisUtil redisUtil;
    private final KakaoMapReverseGeoUtil kakaoMapReverseGeoUtil;

    private static final boolean DEFAULT_POPULAR = false;

    public long getCurrentUserId(String authorization) {
        return tokenAuthClient.getUserId(authorization);
    }

    @Transactional(readOnly = true)
    public List<WatchPlaylistItemResponse> getPlaylist(final long userId) {
        return playlistRepository.findTop50ByUserIdOrderByIdDesc(userId).stream()
                .map(WatchPlaylistItemResponse::of)
                .collect(Collectors.toList());
    }

    public UserLevelInfoResponse getLimitAccount(String authorization) {
        return tokenAuthClient.getLimitAccount(authorization);
    }

    @Transactional
    public void thrownSong(
            final UserLevelInfoResponse userLevelInfoResponse,
            final WatchThrownItemRequest watchThrownItemRequest) {
        final long userId = userLevelInfoResponse.getUserId();
        final String nowDate = localDateUtil.GetDate(LocalDate.now());
        final String key = "user_throw_" + userId + "_" + nowDate;
        final Object value = redisUtil.getData(key);

        int thrownCount = 0;

        if (value == null) {
            thrownCount = userLevelInfoResponse.getLevelCount();
        } else {
            if (Integer.valueOf((String) value) == 0) {
                throw new BadRequestException(NOT_THROW_SONG);
            } else {
                thrownCount = Integer.valueOf((String) value);
            }
        }

        final Point point =
                GeomUtil.createPoint(
                        watchThrownItemRequest.getLongitude(),
                        watchThrownItemRequest.getLatitude());

        final Song song =
                songRepository
                        .findById(watchThrownItemRequest.getSongId())
                        .orElseThrow(() -> new BadRequestException(NOT_FOUND_SONG_ID));

        KakaoMapReverseGeoResponse kakaoMapReverseGeoResponse =
                kakaoMapReverseGeoUtil.getReverseGeo(
                        watchThrownItemRequest.getLatitude(),
                        watchThrownItemRequest.getLongitude());

        Zipcode zipcode =
                zipCodeRepository
                        .findByCode(kakaoMapReverseGeoResponse.getDocuments().get(0).code)
                        .orElseThrow(() -> new BadRequestException(NOT_FOUND_ZIP_CODE));

        musicRepository.save(
                ThrowItem.builder()
                        .content(watchThrownItemRequest.getComment())
                        .itemImage(null)
                        .status(ThrowStatus.valueOf("VISIBLE"))
                        .locationPoint(point)
                        .userId(userId)
                        .zipcode(zipcode)
                        .song(song)
                        .isPopular(DEFAULT_POPULAR)
                        .build());

        thrownCount--;

        redisUtil.setData(key, String.valueOf(thrownCount));
    }

    @Transactional
    public void createPickup(final long userId, final long throwId) {
        final ThrowItem throwItem =
                musicRepository
                        .findById(throwId)
                        .orElseThrow(() -> new BadRequestException(NOT_FOUND_THROW_ITEM_ID));

        if (throwHistoryRepository.existsByUserIdAndThrowItemId(userId, throwId)) {
            throw new BadRequestException(DUPLICATE_PICKUP_REQUEST);
        }

        createThrowHistory(userId, throwItem);
        findPlaylist(userId, throwItem.getSong(), true)
                .orElseGet(
                        () -> {
                            createPlaylistHistory(
                                    createPlaylist(userId, throwItem.getSong()), true);
                            return null;
                        });
    }

    private void createThrowHistory(final long userId, final ThrowItem throwItem) {
        final String key = "user_" + userId + "_pickup_count";
        final Object value = redisUtil.getData(key);
        int pickupCount = 0;

        if (value != null) {
            redisUtil.deleteData(key);
            pickupCount = Integer.valueOf((String) value);
        }

        pickupCount++;
        redisUtil.setData(key, String.valueOf(pickupCount));

        final ThrowHistory throwHistory =
                throwHistoryRepository.save(
                        ThrowHistory.builder().userId(userId).throwItem(throwItem).build());

        throwHistory.setThrowItem(throwItem);
    }

    // @Transactional(readOnly = true)
    private Optional<Playlist> findPlaylist(
            final long userId, final Song song, final boolean status) {
        return playlistRepository.findByUserIdAndSongIdAndStatus(userId, song.getId(), status);
    }

    private void createPlaylistHistory(final Playlist playlist, final boolean status) {
        playlistHistoryRepository.save(
                PlaylistHistory.builder().playlist(playlist).status(status).build());
    }

    private Playlist createPlaylist(final long userId, final Song song) {
        return playlistRepository.save(
                Playlist.builder().userId(userId).song(song).status(true).build());
    }

    @Transactional(readOnly = true)
    public List<WatchFamousMusicResponse> findPopularMusicAtLegalDong(
            final double longitude, final double latitude) {
        KakaoMapReverseGeoResponse kakaoMapReverseGeoResponse =
                kakaoMapReverseGeoUtil.getReverseGeo(latitude, longitude);
        return throwQueryDSLRepository.findByZipCodeIdAndIsPopular(
                kakaoMapReverseGeoResponse.getDocuments().get(0).code);
    }
}
