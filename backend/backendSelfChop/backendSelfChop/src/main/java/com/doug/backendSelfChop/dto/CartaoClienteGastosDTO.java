package com.doug.backendSelfChop.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;


import java.time.LocalDateTime;

@Data
public class CartaoClienteGastosDTO {
    private Long id;

    @JsonIgnore
    private CartaoClienteDTO cartao;

    private Double valor = 0.0;

    private String descricao;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime data;

    public CartaoClienteGastosDTO() {
    }

    public CartaoClienteGastosDTO(CartaoClienteDTO cartao, Double valor, String descricao) {
        this.cartao = cartao;
        this.valor = valor;
        this.descricao = descricao;
    }
}
