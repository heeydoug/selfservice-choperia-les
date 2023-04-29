package com.doug.backendSelfChop.controller;

import com.doug.backendSelfChop.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

@RestController
@AllArgsConstructor
@RequestMapping(value = "api/email")
public class EmailController {

    @Autowired
    private final EmailService emailService;

    @PostMapping("/promocao")   
    public Integer enviarPromocao(@RequestBody String mensagem) throws MessagingException {
        return emailService.sendPromotion(mensagem);
    }
}
