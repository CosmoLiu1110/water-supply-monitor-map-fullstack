package com.groupA7.backend.geocode.exception;

public class InvalidGeocodeRequestException extends RuntimeException {

    public InvalidGeocodeRequestException(String message) {
        super(message);
    }
}