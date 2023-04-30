package com.doug.backendSelfChop.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class OutOfStockException extends ResponseStatusException {
    public OutOfStockException(String reason) {
        super(HttpStatus.BAD_REQUEST, reason);
    }
}
