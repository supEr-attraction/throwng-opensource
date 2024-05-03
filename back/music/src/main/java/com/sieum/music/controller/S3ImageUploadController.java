package com.sieum.music.controller;

import com.sieum.music.service.S3FileUploadService;
import io.swagger.v3.oas.annotations.Operation;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class S3ImageUploadController {

    private final S3FileUploadService s3FileUploadService;

    @Operation(summary = "The comment image is uploaded to S3 and the converted value is returned.")
    @PostMapping("/upload-image")
    public ResponseEntity<?> uploadImage(@RequestPart final MultipartFile imageUrl)
            throws IOException {
        return ResponseEntity.ok().body(s3FileUploadService.uploadFile(imageUrl));
    }
}
