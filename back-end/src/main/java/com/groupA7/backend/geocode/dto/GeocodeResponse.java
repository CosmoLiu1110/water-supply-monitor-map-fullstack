package com.groupA7.backend.geocode.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public class GeocodeResponse {

    private UUID id;
    private String queryText;
    private String normalizedQuery;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String formattedAddress;
    private String provider;
    private String accuracy;
    private LocalDateTime expiresAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean cached;
}