package com.sieum.music.service;

import static com.sieum.music.exception.CustomExceptionStatus.*;

import com.sieum.music.controller.feign.CouponFeignClient;
import com.sieum.music.controller.feign.TokenAuthClient;
import com.sieum.music.domain.*;
import com.sieum.music.domain.ThrowItem;
import com.sieum.music.domain.dao.ThrowCurrentDao;
import com.sieum.music.domain.enums.ThrowStatus;
import com.sieum.music.dto.request.*;
import com.sieum.music.dto.response.*;
import com.sieum.music.dto.response.PlaylistItemResponse;
import com.sieum.music.dto.response.PoiResponse;
import com.sieum.music.dto.response.ThrownMusicDetailResponse;
import com.sieum.music.exception.BadRequestException;
import com.sieum.music.repository.*;
import com.sieum.music.util.GeomUtil;
import com.sieum.music.util.KakaoMapReverseGeoUtil;
import com.sieum.music.util.LocalDateUtil;
import com.sieum.music.util.RedisUtil;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Point;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MusicService {

    private final TokenAuthClient tokenAuthClient;
    private final RedisUtil redisUtil;
    private final MusicRepository musicRepository;
    private final ThrowQueryDSLRepository throwQueryDSLRepository;
    private final ThrowHistoryRepository throwHistoryRepository;
    private final PlaylistRepository playlistRepository;
    private final PlaylistHistoryRepository playlistHistoryRepository;
    private final PlaylistQueryDSLRepository playlistQueryDSLRepository;
    private final SongRepository songRepository;
    private final LocalDateUtil localDateUtil;
    private final ZipCodeRepository zipCodeRepository;
    private final ArtistRepository artistRepository;
    private final S3FileUploadService s3FileUploadService;
    private final KakaoMapReverseGeoUtil kakaoMapReverseGeoUtil;
    private final String THROWNG_TYPE = "THROWNG";
    private final String PICKUP_TYPE = "PICKUP";
    private final CouponFeignClient couponFeignClient;

    public long getCurrentUserId(String authorization) {
        return tokenAuthClient.getUserId(authorization);
    }

    public ThrownMusicDetailResponse getDetailOfThrownMusic(final long userId, final long throwId) {
        final ThrowItem throwItem =
                musicRepository
                        .findById(throwId)
                        .orElseThrow(() -> new BadRequestException(NOT_FOUND_THROW_ITEM_ID));

        return ThrownMusicDetailResponse.of(
                throwItem,
                userId,
                throwHistoryRepository.findByThrowItemId(throwItem.getId()).size());
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

        // upgrade experiencePoint
        tokenAuthClient.upgradeExperiencePoint(
                UpdateExperiencePointRequest.of(userId, PICKUP_TYPE));
    }

    private Playlist createPlaylist(final long userId, final Song song) {
        return playlistRepository.save(
                Playlist.builder().userId(userId).song(song).status(true).build());
    }

    private void createPlaylistHistory(final Playlist playlist, final boolean status) {
        playlistHistoryRepository.save(
                PlaylistHistory.builder().playlist(playlist).status(status).build());
    }

    private Optional<Playlist> findPlaylist(
            final long userId, final Song song, final boolean status) {
        return playlistRepository.findByUserIdAndSongIdAndStatus(userId, song.getId(), status);
    }

    public Slice<PlaylistItemResponse> getPlaylist(
            final long userId, final LocalDateTime modifiedAt) {
        Pageable pageable = PageRequest.of(0, 20);
        return playlistQueryDSLRepository.getPlaylist(userId, modifiedAt, pageable);
    }

    public List<PoiResponse> findNearItemsPoints(final NearItemPointRequest nearItemPointRequest) {
        final Point point =
                GeomUtil.createPoint(
                        nearItemPointRequest.getLongitude(), nearItemPointRequest.getLatitude());
        return throwQueryDSLRepository
                .findNearItemsPointsByDistance(
                        point,
                        nearItemPointRequest.getDistance(),
                        nearItemPointRequest.getInnerDistance())
                .stream()
                .filter(item -> item.getStatus().equals(ThrowStatus.valueOf("VISIBLE")))
                .map(PoiResponse::fromItemPoint)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deletePlaylist(final long userId, final int playlistId) {
        final Playlist playlist =
                playlistRepository
                        .findByIdAndUserId(playlistId, userId)
                        .orElseThrow(() -> new BadRequestException(NOT_FOUND_PLAYLIST_ID));
        playlist.changePlaylistStatus(false);
        playlistRepository.save(playlist);
        createPlaylistHistory(playlist, false);
    }

    public Long countThrowngSong(final long userId) {
        return musicRepository.countByUserId(userId);
    }

    public Long countPickUpSong(final long userId) {
        return throwHistoryRepository.countByUserId(userId);
    }

    //    public List<ThrowItemResponse> getThrowItems() {
    //        return throwQueryDSLRepository.findThrowHistoryIsNull();
    //    }
    //    public long getLimitAccount(String authorization) {
    //        return tokenAuthClient.getLimitAccount(authorization);
    //    }

    public UserLevelInfoResponse getLimitAccount(String authorization) {
        return tokenAuthClient.getLimitAccount(authorization);
    }

    @Transactional
    public void thrownSong(
            final UserLevelInfoResponse userLevelInfoResponse,
            final String youtubeId,
            final ThrownItemRequest thrownItemRequest) {
        final long userId = userLevelInfoResponse.getUserId();
        final String nowDate = localDateUtil.GetDate(LocalDate.now());
        final String key = userId + "_THROWNG";
        final String couponValue = redisUtil.getData(key);

        if (couponValue != null) {
            if (couponValue.equals("THROWNG_INF")) {
                throwngUtil(userId, youtubeId, thrownItemRequest, nowDate);
            } else {
                final String detailKey = userId + "_" + couponValue;
                final Object value = redisUtil.getObject(detailKey);
                int countByCoupon = (int) value;

                if (countByCoupon == 0) {
                    basicThrowng(userLevelInfoResponse, nowDate, youtubeId, thrownItemRequest);
                }

                throwngUtil(userId, youtubeId, thrownItemRequest, nowDate);
                countByCoupon--;
                redisUtil.setObject(detailKey, countByCoupon);
                if (countByCoupon == 0) {
                    final Object idValue = redisUtil.getObject(userId + "_COUPON_ID_THROWNG");
                    final long couponId = (long) idValue;

                    CouponStatusRequest couponStatusRequest =
                            CouponStatusRequest.of(couponId, userId, "THROWNG");
                    couponFeignClient.modifyCouponStatus(couponStatusRequest);
                }
            }

        } else {
            basicThrowng(userLevelInfoResponse, nowDate, youtubeId, thrownItemRequest);
        }

        // upgrade experiencePoint
        tokenAuthClient.upgradeExperiencePoint(
                UpdateExperiencePointRequest.of(userId, THROWNG_TYPE));
    }

    public List<ThrownSongResponse> getThrownSong(final long userId) {
        List<ThrowItem> throwItems = musicRepository.findByUserId(userId);
        final List<ThrownSongResponse> thrwonSongResponse =
                throwItems.stream()
                        .map(
                                throwItem ->
                                        ThrownSongResponse.of(
                                                throwItem,
                                                throwHistoryRepository.findByThrowItemId(
                                                        throwItem.getId())))
                        .collect(Collectors.toList());

        return thrwonSongResponse;
    }

    public List<PickedUpSongResponse> getPickedUpSong(final long userId) {
        List<ThrowHistory> throwHistories = throwHistoryRepository.findByUserId(userId);
        List<PickedUpSongResponse> pickedUpSongResponse =
                throwHistories.stream()
                        .map(throwHistory -> PickedUpSongResponse.of(throwHistory))
                        .collect(Collectors.toList());

        return pickedUpSongResponse;
    }

    public ReverseGeoResponse getReverseGeo(final ReverseGeoCodeRequest reverseGeoCodeRequest) {
        KakaoMapReverseGeoResponse kakaoMapReverseGeoResponse =
                kakaoMapReverseGeoUtil.getReverseGeo(
                        reverseGeoCodeRequest.getLatitude(), reverseGeoCodeRequest.getLongitude());
        return ReverseGeoResponse.of(kakaoMapReverseGeoResponse);
    }

    @Transactional
    public long deleteNotFamousMusic() {
        List<ThrowItem> throwItems = throwQueryDSLRepository.findThrowHistoryIsNull();
        throwItems.forEach(throwItem -> throwItem.changeThrowStatus(ThrowStatus.HIDDEN.getValue()));
        return throwItems.size();
    }

    public MusicExperienceCountResponse getMusicExperienceCount(
            final MusicExperienceCountReqeust musicExperienceCountReqeust) {
        List<ThrowItem> throwItems =
                musicRepository.findByUserIdAndCreatedAtAfter(
                        musicExperienceCountReqeust.getUserId(),
                        musicExperienceCountReqeust.getCreatedAt());

        List<ThrowHistory> pickedupItems =
                throwHistoryRepository.findByUserIdAndCreatedAtAfter(
                        musicExperienceCountReqeust.getUserId(),
                        musicExperienceCountReqeust.getCreatedAt());

        return MusicExperienceCountResponse.of(throwItems.size(), pickedupItems.size());
    }

    public boolean checkUsingUnlimitedRadiusCoupon(final long userId) {
        String value = redisUtil.getData(userId + "_radius");
        if (value == null) {
            return false;
        }
        return true;
    }

    public void throwngUtil(
            final long userId,
            final String youtubeId,
            final ThrownItemRequest thrownItemRequest,
            final String nowDate) {
        final Point point =
                GeomUtil.createPoint(
                        thrownItemRequest.getLongitude(), thrownItemRequest.getLatitude());

        // Verification: The same user cannot throw the same song again within 100m
        ThrowCurrentDao throwDao =
                throwQueryDSLRepository
                        .findNearItemsPointsByDistanceAndUserIdAndCreatedAtAndYoutubeId(
                                point, 100.0, userId, nowDate, youtubeId);

        if (throwDao != null) {
            if (throwDao.getStatus().equals(ThrowStatus.valueOf("VISIBLE"))) {
                throw new BadRequestException(NOT_THROW_ITEM_IN_LIMITED_RADIUS);
            }
        }

        // String[] zipArray = thrownItemRequest.getLocation().split("\\s");
        Zipcode zipcode =
                zipCodeRepository
                        .findByCode(thrownItemRequest.getCode())
                        .orElseThrow(() -> new BadRequestException(NOT_FOUND_ZIP_CODE));

        boolean isSong = songRepository.existsByYoutubeId(youtubeId);
        if (!isSong) {
            boolean isArtist = artistRepository.existsByName(thrownItemRequest.getArtist());
            if (!isArtist) {
                artistRepository.save(Artist.builder().name(thrownItemRequest.getArtist()).build());
            }
            Artist artist = artistRepository.findByName(thrownItemRequest.getArtist());

            songRepository.save(
                    Song.builder()
                            .youtubeId(youtubeId)
                            .title(thrownItemRequest.getTitle())
                            .albumImage(thrownItemRequest.getAlbumImageUrl())
                            .artist(artist)
                            .previewUrl(thrownItemRequest.getPreviewUrl())
                            .build());
        }

        Song song =
                songRepository
                        .findByYoutubeId(youtubeId)
                        .orElseThrow(() -> new BadRequestException(NOT_FOUND_YOUTUBE_ID));

        musicRepository.save(
                ThrowItem.builder()
                        .content(thrownItemRequest.getComment())
                        .itemImage(thrownItemRequest.getImageUrl())
                        .status(ThrowStatus.valueOf("VISIBLE"))
                        .isPopular(false)
                        .locationPoint(point)
                        .userId(userId)
                        .zipcode(zipcode)
                        .song(song)
                        .build());
    }

    public void basicThrowng(
            final UserLevelInfoResponse userLevelInfoResponse,
            final String nowDate,
            final String youtubeId,
            final ThrownItemRequest thrownItemRequest) {

        final String key = "user_throw_" + userLevelInfoResponse.getUserId() + "_" + nowDate;
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
        throwngUtil(userLevelInfoResponse.getUserId(), youtubeId, thrownItemRequest, nowDate);
        thrownCount--;

        redisUtil.setData(key, String.valueOf(thrownCount));
    }
}
