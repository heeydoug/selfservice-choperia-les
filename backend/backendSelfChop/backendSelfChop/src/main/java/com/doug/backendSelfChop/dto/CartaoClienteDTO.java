package com.doug.backendSelfChop.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class CartaoClienteDTO {

    private Long id;

    private ClienteDTO cliente;

    private String rfid;

    private String metodoPagamento;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime entrada;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime saida;

    private Boolean status = true;

    @JsonIgnoreProperties(value = "cartao")
    private List<CartaoClienteGastosDTO> gastos = new ArrayList<>();
}
