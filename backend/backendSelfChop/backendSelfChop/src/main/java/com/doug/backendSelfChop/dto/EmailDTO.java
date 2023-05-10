package com.doug.backendSelfChop.dto;

import lombok.Getter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
public class EmailDTO implements Serializable {
    private String conteudo;

    private LocalDateTime dataInicio;

    private LocalDateTime dataFim;
}
