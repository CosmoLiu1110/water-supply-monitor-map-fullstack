package com.groupA7.backend.geocode;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "geocode_cache",
        indexes = {
                @Index(name = "idx_geocode_query_text", columnList = "query_text"),
                @Index(name = "idx_geocode_normalized_query", columnList = "normalized_query")
        }
)
@Getter
@Setter
@NoArgsConstructor
public class GeocodeCache {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "query_text", nullable = false, length = 255)
    private String queryText;

    @Column(name = "normalized_query", length = 255)
    private String normalizedQuery;

    @Column(nullable = false, precision = 9, scale = 6)
    private BigDecimal latitude;

    @Column(nullable = false, precision = 9, scale = 6)
    private BigDecimal longitude;

    @Column(name = "formatted_address", length = 255)
    private String formattedAddress;

    @Column(length = 50)
    private String provider;

    @Column(length = 50)
    private String accuracy;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}