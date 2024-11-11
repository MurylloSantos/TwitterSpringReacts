package com.gmail.merikbest2015.controller.api;

import com.gmail.merikbest2015.commons.constants.PathConstants;
import com.gmail.merikbest2015.dto.response.WallpaperResponse;
import com.gmail.merikbest2015.mapper.WallpaperMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(PathConstants.API_V1_LOCALIZATION)
public class WallpaperApiController {

    private final WallpaperMapper wallpaperMapper;

    @GetMapping(PathConstants.WALLPAPER)
    public ResponseEntity<WallpaperResponse> getWallpaper() {
        return ResponseEntity.ok(wallpaperMapper.getWallpaper());
    }
}
