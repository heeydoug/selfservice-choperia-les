package com.doug.backendSelfChop.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CartaoClienteGastosDTO {
    private Long id;

    private CartaoClienteDTO cartao;

    private Double valor = 0.0;

    private String descricao;

    private LocalDateTime data;

    public CartaoClienteGastosDTO() {
    }

    public CartaoClienteGastosDTO(CartaoClienteDTO cartao, Double valor, String descricao) {
        this.cartao = cartao;
        this.valor = valor;
        this.descricao = descricao;
    }
}
