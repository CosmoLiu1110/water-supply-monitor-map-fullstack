package com.groupA7.backend.pump;

import com.groupA7.backend.pump.dto.PumpRequest;
import com.groupA7.backend.pump.dto.PumpResponse;
import com.groupA7.backend.pump.dto.PumpUpdateRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/pumps")
@RequiredArgsConstructor
public class PumpController {

    private final PumpService pumpService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PumpResponse createPump(@Valid @RequestBody PumpRequest request) {
        return pumpService.createPump(request);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<PumpResponse> getAllPumps(@RequestParam(required = false) PumpStatus status) {
        return pumpService.getAllPumps(status);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public PumpResponse getPumpById(@PathVariable UUID id) {
        return pumpService.getPumpById(id);
    }

    @GetMapping("/code/{pumpCode}")
    @ResponseStatus(HttpStatus.OK)
    public PumpResponse getPumpByCode(@PathVariable String pumpCode) {
        return pumpService.getPumpByCode(pumpCode);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public PumpResponse updatePump(@PathVariable UUID id, @Valid @RequestBody PumpUpdateRequest request) {
        return pumpService.updatePump(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePump(@PathVariable UUID id) {
        pumpService.deletePump(id);
    }
}