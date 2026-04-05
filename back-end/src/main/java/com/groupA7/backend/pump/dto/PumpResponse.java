package com.groupA7.backend.pump.dto;

import com.groupA7.backend.pump.PumpStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public class PumpResponse {

    private UUID id;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private PumpStatus status;
    private String name;
    private String address;
    private String pumpCode;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}