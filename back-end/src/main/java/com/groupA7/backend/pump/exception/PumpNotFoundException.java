package com.groupA7.backend.pump.exception;

public class PumpNotFoundException extends RuntimeException {

    public PumpNotFoundException(String message) {
        super(message);
    }
}