package com.groupA7.backend.geocode;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface GeocodeCacheRepository extends JpaRepository<GeocodeCache, UUID> {

    Optional<GeocodeCache> findByNormalizedQuery(String normalizedQuery);
}