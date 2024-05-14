package com.sieum.music.domain.dao;

import com.sieum.music.domain.enums.ThrowStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ThrowCurrentDao {
    private Long id;
    private ThrowStatus status;

    public ThrowCurrentDao(Long id, ThrowStatus status) {
        this.id = id;
        this.status = status;
    }
}
