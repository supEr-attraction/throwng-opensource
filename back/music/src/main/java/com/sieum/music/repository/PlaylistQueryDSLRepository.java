package com.sieum.music.repository;

import static com.sieum.music.domain.QPlaylist.playlist;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sieum.music.dto.response.PlaylistItemResponse;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PlaylistQueryDSLRepository {

    private final JPAQueryFactory queryFactory;

    public Slice<PlaylistItemResponse> getPlaylist(
            final long userId, final LocalDateTime modifiedAt, final Pageable pageable) {

        final List<PlaylistItemResponse> playlistItemResponseList =
                queryFactory
                        .select(
                                Projections.fields(
                                        PlaylistItemResponse.class,
                                        playlist.id.as("playlistId"),
                                        playlist.song.title,
                                        playlist.song.artist.name.as("artist"),
                                        playlist.song.albumImage,
                                        playlist.modifiedAt,
                                        playlist.song.youtubeId,
                                        playlist.song.previewUrl))
                        .from(playlist)
                        .where(
                                isFirstPage(modifiedAt),
                                playlist.userId.eq(userId),
                                playlist.status.eq(true))
                        .orderBy(playlist.modifiedAt.desc())
                        .limit(pageable.getPageSize() + 1)
                        .fetch();
        return checkEndPage(pageable, playlistItemResponseList);
    }

    private BooleanExpression isFirstPage(final LocalDateTime modifiedAt) {
        if (modifiedAt == null) return null;
        return playlist.modifiedAt.lt(modifiedAt);
    }

    private Slice<PlaylistItemResponse> checkEndPage(
            Pageable pageable, List<PlaylistItemResponse> playlistItemResponseList) {
        boolean hasNext = false;
        if (playlistItemResponseList.size() > pageable.getPageSize()) {
            hasNext = true;
            playlistItemResponseList.remove(pageable.getPageSize());
        }
        return new SliceImpl<>(playlistItemResponseList, pageable, hasNext);
    }
}
