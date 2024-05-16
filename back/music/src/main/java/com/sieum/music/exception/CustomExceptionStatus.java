package com.sieum.music.exception;

import com.sieum.music.dto.ErrorReason;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CustomExceptionStatus implements BaseErrorCode {
    INTERNAL_SERVER_ERROR("InternalServer_500_1", "Server error"),
    SPOTIFY_CONNECTION_ERROR("SpotifyConnection_500_2", "Spotify connection error"),
    SPOTIFY_SEARCH_ERROR("SpotifySearch_500_3", "Spotify search error"),
    INVALID_REQUEST("BadRequest_400_1", "Invalid request"),
    REQUEST_ERROR("NotValidInput_400_2", "Invalid input"),
    NOT_FOUND_THROW_ITEM_ID("Throw_400_1", "No throw item with the requested id"),
    DUPLICATE_PICKUP_REQUEST("Throw_400_2", "No duplicate pick-up request for one thrown item"),
    NOT_FOUND_KEY_WORD("Search_400_1", "No search key word"),
    NOT_FOUND_PLAYLIST_ID("PLAYLIST_400_1", "No playlist with the requested id"),
    NOT_FOUND_YOUTUBE_ID("Song_400_1", "No Song with the requested id"),
    NOT_THROW_SONG("Song_400_2", "The number of songs assigned per day is over"),
    NOT_FOUND_SONG_ID("Song_400_3", "No Song with the requested song id"),
    NOT_FOUND_ZIP_CODE("Zip_code_400_1", "This location doesn't exist"),
    NOT_FOUND_ARTIST("Artist_400_1", "The artist does not exist"),
    NOT_THROW_ITEM_IN_LIMITED_RADIUS(
            "Throw_400_2", "Can't throw the same song in a limited radius"),
    NOT_FOUND_QUESTION_COUPON("Coupon_400_1", "Not using a question mark coupon"),
    NOT_FOUND_THROW_HISTORY_ITEM_ID(
            "Throw_history_400_1", "No throw history with the requested id");

    private String code;
    private String reason;

    @Override
    public ErrorReason getErrorReason() {
        return ErrorReason.builder().reason(reason).code(code).build();
    }
}
