package com.doug.backendSelfChop.dto;


import lombok.Data;

import java.io.Serializable;
@Data
public class ProdutoDTO implements Serializable {

    private String nome;
    private String codigoBarras;
    private Integer saldoEstoque;
    private Double precoCompra;
    private String descricao;
}
