package com.groupA7.backend.pump;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PumpRepository extends JpaRepository<Pump, UUID> {

    List<Pump> findByStatus(PumpStatus status);

    Optional<Pump> findByPumpCode(String pumpCode);

    boolean existsByPumpCode(String pumpCode);
}