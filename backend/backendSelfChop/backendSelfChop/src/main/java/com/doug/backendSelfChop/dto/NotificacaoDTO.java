package com.doug.backendSelfChop.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;

@Data
public class NotificacaoDTO implements Serializable {

    private Long id_notificao;

    private String mensagem;

    private LocalDate data;

    private Boolean status;
}
