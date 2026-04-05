package com.groupA7.backend.pump;

import com.groupA7.backend.pump.dto.PumpRequest;
import com.groupA7.backend.pump.dto.PumpResponse;
import com.groupA7.backend.pump.dto.PumpUpdateRequest;
import com.groupA7.backend.pump.exception.DuplicatePumpCodeException;
import com.groupA7.backend.pump.exception.PumpNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PumpService {

    private final PumpRepository pumpRepository;

    public PumpResponse createPump(PumpRequest request) {
        if (request.getPumpCode() != null && !request.getPumpCode().isBlank()
                && pumpRepository.existsByPumpCode(request.getPumpCode())) {
            throw new DuplicatePumpCodeException("Pump code already exists: " + request.getPumpCode());
        }

        Pump pump = new Pump();
        pump.setLatitude(request.getLatitude());
        pump.setLongitude(request.getLongitude());
        pump.setStatus(request.getStatus());
        pump.setName(request.getName());
        pump.setAddress(request.getAddress());
        pump.setPumpCode(request.getPumpCode());

        Pump savedPump = pumpRepository.save(pump);
        return toResponse(savedPump);
    }

    public List<PumpResponse> getAllPumps(PumpStatus status) {
        List<Pump> pumps = (status == null)
                ? pumpRepository.findAll()
                : pumpRepository.findByStatus(status);

        return pumps.stream()
                .map(this::toResponse)
                .toList();
    }

    public PumpResponse getPumpById(UUID id) {
        Pump pump = pumpRepository.findById(id)
                .orElseThrow(() -> new PumpNotFoundException("Pump not found: " + id));
        return toResponse(pump);
    }

    public PumpResponse getPumpByCode(String pumpCode) {
        Pump pump = pumpRepository.findByPumpCode(pumpCode)
                .orElseThrow(() -> new PumpNotFoundException("Pump not found with code: " + pumpCode));
        return toResponse(pump);
    }

    public PumpResponse updatePump(UUID id, PumpUpdateRequest request) {
        Pump pump = pumpRepository.findById(id)
                .orElseThrow(() -> new PumpNotFoundException("Pump not found: " + id));

        if (request.getPumpCode() != null && !request.getPumpCode().isBlank()) {
            boolean isChangingCode = pump.getPumpCode() == null || !request.getPumpCode().equals(pump.getPumpCode());
            if (isChangingCode && pumpRepository.existsByPumpCode(request.getPumpCode())) {
                throw new DuplicatePumpCodeException("Pump code already exists: " + request.getPumpCode());
            }
            pump.setPumpCode(request.getPumpCode());
        }

        if (request.getLatitude() != null) {
            pump.setLatitude(request.getLatitude());
        }
        if (request.getLongitude() != null) {
            pump.setLongitude(request.getLongitude());
        }
        if (request.getStatus() != null) {
            pump.setStatus(request.getStatus());
        }
        if (request.getName() != null) {
            pump.setName(request.getName());
        }
        if (request.getAddress() != null) {
            pump.setAddress(request.getAddress());
        }

        Pump updatedPump = pumpRepository.save(pump);
        return toResponse(updatedPump);
    }

    public void deletePump(UUID id) {
        Pump pump = pumpRepository.findById(id)
                .orElseThrow(() -> new PumpNotFoundException("Pump not found: " + id));
        pumpRepository.delete(pump);
    }

    private PumpResponse toResponse(Pump pump) {
        PumpResponse response = new PumpResponse();
        response.setId(pump.getId());
        response.setLatitude(pump.getLatitude());
        response.setLongitude(pump.getLongitude());
        response.setStatus(pump.getStatus());
        response.setName(pump.getName());
        response.setAddress(pump.getAddress());
        response.setPumpCode(pump.getPumpCode());
        response.setCreatedAt(pump.getCreatedAt());
        response.setUpdatedAt(pump.getUpdatedAt());
        return response;
    }
}