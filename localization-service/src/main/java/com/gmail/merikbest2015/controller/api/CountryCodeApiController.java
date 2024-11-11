package com.gmail.merikbest2015.controller.api;

import com.gmail.merikbest2015.commons.constants.PathConstants;
import com.gmail.merikbest2015.service.CountryCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(PathConstants.API_V1_LOCALIZATION)
public class CountryCodeApiController {

    private final CountryCodeService countryCodeService;

    @GetMapping(PathConstants.PHONE_CODE)
    public ResponseEntity<Boolean> isPhoneCodeExists(@PathVariable("code") String code) {
        return ResponseEntity.ok(countryCodeService.isPhoneCodeExists(code));
    }
}
