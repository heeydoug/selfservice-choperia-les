package com.doug.backendSelfChop.dto;

import com.doug.backendSelfChop.domain.CartaoClienteGastos;
import com.doug.backendSelfChop.domain.Cliente;
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

    private boolean status = true;

    private List<CartaoClienteGastosDTO> gastos = new ArrayList<>();
}
