package com.doug.backendSelfChop.dto;

import com.doug.backendSelfChop.domain.CartaoCliente;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CartaoClienteGastosDTO {
    private Long id;

    private CartaoClienteDTO cartao;

    private Double valor = 0.0;

    private String descricao;

    private LocalDateTime data;
}
