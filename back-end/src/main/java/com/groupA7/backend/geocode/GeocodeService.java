package com.groupA7.backend.geocode;

import com.fasterxml.jackson.databind.JsonNode;
import com.groupA7.backend.geocode.dto.GeocodeRequest;
import com.groupA7.backend.geocode.dto.GeocodeResponse;
import com.groupA7.backend.geocode.exception.GeocodeNotFoundException;
import com.groupA7.backend.geocode.exception.InvalidGeocodeRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GeocodeService {

    private final GeocodeCacheRepository geocodeCacheRepository;

    private final RestClient restClient = RestClient.builder()
            .defaultHeader("User-Agent", "BrunelWaterApp/1.0")
            .build();

    public GeocodeResponse createGeocodeCache(GeocodeRequest request) {
        if (request.getLatitude() == null || request.getLongitude() == null) {
            throw new InvalidGeocodeRequestException("Latitude and longitude are required");
        }

        GeocodeCache geocodeCache = new GeocodeCache();
        geocodeCache.setQueryText(request.getQueryText());
        geocodeCache.setNormalizedQuery(normalizeQuery(request.getQueryText()));
        geocodeCache.setLatitude(request.getLatitude());
        geocodeCache.setLongitude(request.getLongitude());
        geocodeCache.setFormattedAddress(request.getFormattedAddress());
        geocodeCache.setProvider(request.getProvider());
        geocodeCache.setAccuracy(request.getAccuracy());
        geocodeCache.setExpiresAt(request.getExpiresAt());

        GeocodeCache saved = geocodeCacheRepository.save(geocodeCache);
        return toResponse(saved, false);
    }

    public GeocodeResponse resolve(String query) {
        if (query == null || query.isBlank()) {
            throw new InvalidGeocodeRequestException("Query is required");
        }

        String normalizedQuery = normalizeQuery(query);

        GeocodeCache cachedResult = geocodeCacheRepository.findByNormalizedQuery(normalizedQuery)
                .filter(this::isNotExpired)
                .orElse(null);

        if (cachedResult != null) {
            return toResponse(cachedResult, true);
        }

        ProviderResult providerResult = geocodeFromProvider(query);

        GeocodeCache geocodeCache = new GeocodeCache();
        geocodeCache.setQueryText(query);
        geocodeCache.setNormalizedQuery(normalizedQuery);
        geocodeCache.setLatitude(providerResult.latitude());
        geocodeCache.setLongitude(providerResult.longitude());
        geocodeCache.setFormattedAddress(providerResult.formattedAddress());
        geocodeCache.setProvider(providerResult.provider());
        geocodeCache.setAccuracy(providerResult.accuracy());
        geocodeCache.setExpiresAt(LocalDateTime.now().plusDays(30));

        GeocodeCache saved = geocodeCacheRepository.save(geocodeCache);
        return toResponse(saved, false);
    }

    public GeocodeResponse getByQuery(String query) {
        String normalizedQuery = normalizeQuery(query);

        GeocodeCache geocodeCache = geocodeCacheRepository.findByNormalizedQuery(normalizedQuery)
                .orElseThrow(() -> new GeocodeNotFoundException("Geocode not found for query: " + query));

        return toResponse(geocodeCache, true);
    }

    public List<GeocodeResponse> getAllGeocodeCache() {
        return geocodeCacheRepository.findAll().stream()
                .map(cache -> toResponse(cache, true))
                .toList();
    }

    public GeocodeResponse getById(UUID id) {
        GeocodeCache geocodeCache = geocodeCacheRepository.findById(id)
                .orElseThrow(() -> new GeocodeNotFoundException("Geocode cache not found: " + id));

        return toResponse(geocodeCache, true);
    }

    private ProviderResult geocodeFromProvider(String query) {
        try {
            JsonNode response = restClient.get()
                    .uri("https://nominatim.openstreetmap.org/search?q={address}&format=json&limit=1", query)
                    .retrieve()
                    .body(JsonNode.class);

            if (response == null || !response.isArray() || response.isEmpty()) {
                throw new GeocodeNotFoundException("No geocoding result found for query: " + query);
            }

            JsonNode first = response.get(0);

            BigDecimal latitude = new BigDecimal(first.path("lat").asText());
            BigDecimal longitude = new BigDecimal(first.path("lon").asText());
            String formattedAddress = first.path("display_name").asText(null);

            return new ProviderResult(
                    latitude,
                    longitude,
                    formattedAddress,
                    "nominatim",
                    "high"
            );
        } catch (GeocodeNotFoundException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new GeocodeNotFoundException("Failed to geocode query: " + query);
        }
    }

    private boolean isNotExpired(GeocodeCache geocodeCache) {
        return geocodeCache.getExpiresAt() == null || geocodeCache.getExpiresAt().isAfter(LocalDateTime.now());
    }

    private String normalizeQuery(String query) {
        if (query == null) {
            return null;
        }
        return query.trim().toLowerCase().replaceAll("\\s+", " ");
    }

    private GeocodeResponse toResponse(GeocodeCache geocodeCache, boolean cached) {
        GeocodeResponse response = new GeocodeResponse();
        response.setId(geocodeCache.getId());
        response.setQueryText(geocodeCache.getQueryText());
        response.setNormalizedQuery(geocodeCache.getNormalizedQuery());
        response.setLatitude(geocodeCache.getLatitude());
        response.setLongitude(geocodeCache.getLongitude());
        response.setFormattedAddress(geocodeCache.getFormattedAddress());
        response.setProvider(geocodeCache.getProvider());
        response.setAccuracy(geocodeCache.getAccuracy());
        response.setExpiresAt(geocodeCache.getExpiresAt());
        response.setCreatedAt(geocodeCache.getCreatedAt());
        response.setUpdatedAt(geocodeCache.getUpdatedAt());
        response.setCached(cached);
        return response;
    }

    private record ProviderResult(
            BigDecimal latitude,
            BigDecimal longitude,
            String formattedAddress,
            String provider,
            String accuracy
    ) {}
}