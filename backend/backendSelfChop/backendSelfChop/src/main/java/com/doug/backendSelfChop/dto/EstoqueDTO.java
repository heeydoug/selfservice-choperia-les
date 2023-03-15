package com.doug.backendSelfChop.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class EstoqueDTO implements Serializable {

    private String codigoBarras;
    private String nome;
    private Integer saldoEstoque;
    private String descricao;
}
