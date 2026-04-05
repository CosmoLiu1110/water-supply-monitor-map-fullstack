package com.groupA7.backend.pump.exception;

public class DuplicatePumpCodeException extends RuntimeException {

    public DuplicatePumpCodeException(String message) {
        super(message);
    }
}