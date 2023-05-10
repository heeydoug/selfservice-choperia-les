package com.doug.backendSelfChop.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ClientWihoutCheckoutException extends ResponseStatusException {
    public ClientWihoutCheckoutException(String reason) {
        super(HttpStatus.BAD_REQUEST, reason);
    }
}
