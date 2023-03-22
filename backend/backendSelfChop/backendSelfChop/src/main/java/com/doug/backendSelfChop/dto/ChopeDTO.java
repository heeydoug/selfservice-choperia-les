package com.doug.backendSelfChop.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class ChopeDTO implements Serializable {

    private String rfid;
    private String nome;
    private Double precoCompra;
    private Double precoCopo;
    private Double saldoEstoque;
}
