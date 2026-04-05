package com.groupA7.backend.pump;

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
        name = "pumps",
        indexes = {
                @Index(name = "idx_pumps_lat_lng", columnList = "latitude,longitude"),
                @Index(name = "idx_pumps_status", columnList = "status"),
                @Index(name = "idx_pumps_code", columnList = "pump_code")
        }
)
@Getter
@Setter
@NoArgsConstructor
public class Pump {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, precision = 9, scale = 6)
    private BigDecimal latitude;

    @Column(nullable = false, precision = 9, scale = 6)
    private BigDecimal longitude;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private PumpStatus status;

    @Column(length = 100)
    private String name;

    @Column(length = 255)
    private String address;

    @Column(name = "pump_code", length = 50, unique = true)
    private String pumpCode;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}