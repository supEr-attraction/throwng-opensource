package com.sieum.music.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ThrowHistory extends CreatedTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "throw_history_id")
    private Long id;

    @NotNull private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "throw_item_id")
    @NotNull
    private ThrowItem throwItem;

    public void setThrowItem(ThrowItem throwItem) {
        this.throwItem = throwItem;
        throwItem.getThrowHistoryList().add(this);
    }
}
