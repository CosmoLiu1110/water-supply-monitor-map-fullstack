package com.groupA7.backend.geocode;

import com.groupA7.backend.geocode.dto.GeocodeRequest;
import com.groupA7.backend.geocode.dto.GeocodeResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/geocode")
@RequiredArgsConstructor
public class GeocodeController {

    private final GeocodeService geocodeService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GeocodeResponse createGeocodeCache(@Valid @RequestBody GeocodeRequest request) {
        return geocodeService.createGeocodeCache(request);
    }

    @GetMapping("/resolve")
    @ResponseStatus(HttpStatus.OK)
    public GeocodeResponse resolve(@RequestParam String query) {
        return geocodeService.resolve(query);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public GeocodeResponse getByQuery(@RequestParam String query) {
        return geocodeService.getByQuery(query);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<GeocodeResponse> getAllGeocodeCache() {
        return geocodeService.getAllGeocodeCache();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public GeocodeResponse getById(@PathVariable UUID id) {
        return geocodeService.getById(id);
    }
}