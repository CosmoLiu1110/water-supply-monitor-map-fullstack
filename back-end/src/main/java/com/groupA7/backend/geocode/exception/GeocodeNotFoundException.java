package com.groupA7.backend.geocode.exception;

public class GeocodeNotFoundException extends RuntimeException {

    public GeocodeNotFoundException(String message) {
        super(message);
    }
}