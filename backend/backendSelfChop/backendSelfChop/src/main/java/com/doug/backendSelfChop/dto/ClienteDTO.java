package com.doug.backendSelfChop.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class ClienteDTO implements Serializable {
    private String rfid;
    private String telefone;
    private String nome;
    private String email;
    private String cpf;
}
