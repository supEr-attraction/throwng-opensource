package com.sieum.music.controller;

import com.sieum.music.service.BatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/batch")
@RequiredArgsConstructor
public class BatchController {

    private final BatchService batchService;

    @PutMapping("/popular")
    public ResponseEntity<?> popularMusic() {
        batchService.popularMusic();
        return ResponseEntity.ok().build();
    }
}
