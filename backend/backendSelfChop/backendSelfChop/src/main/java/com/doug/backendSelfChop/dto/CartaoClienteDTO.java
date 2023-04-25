package com.doug.backendSelfChop.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class CartaoClienteDTO {

    private Long id;

    private ClienteDTO cliente;

    private String rfid;

    private String metodoPagamento;

    private LocalDateTime entrada;

    private LocalDateTime saida;

    private Boolean status = true;

    @JsonIgnoreProperties(value = "cartao")
    private List<CartaoClienteGastosDTO> gastos = new ArrayList<>();
}
