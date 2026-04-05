package com.groupA7.backend.geocode.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class GeocodeRequest {

    @NotBlank(message = "Query text is required")
    @Size(max = 255, message = "Query text must not exceed 255 characters")
    private String queryText;

    @DecimalMin(value = "-90.0", message = "Latitude must be greater than or equal to -90")
    @DecimalMax(value = "90.0", message = "Latitude must be less than or equal to 90")
    private BigDecimal latitude;

    @DecimalMin(value = "-180.0", message = "Longitude must be greater than or equal to -180")
    @DecimalMax(value = "180.0", message = "Longitude must be less than or equal to 180")
    private BigDecimal longitude;

    @Size(max = 255, message = "Formatted address must not exceed 255 characters")
    private String formattedAddress;

    @Size(max = 50, message = "Provider must not exceed 50 characters")
    private String provider;

    @Size(max = 50, message = "Accuracy must not exceed 50 characters")
    private String accuracy;

    private LocalDateTime expiresAt;
}