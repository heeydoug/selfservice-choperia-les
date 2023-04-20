package com.doug.backendSelfChop.domain;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "cartao_cliente")
public class CartaoCliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cpf_cliente", referencedColumnName = "cpf", nullable = false)
    private Cliente cliente;

    @Column(name = "rfid", nullable = false)
    private String rfid;

    @Column(name = "metodo_pagamento")
    private String metodoPagamento;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @Column(name = "entrada")
    private LocalDateTime entrada = LocalDateTime.now();

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @Column(name = "saida")
    private LocalDateTime saida;

    @Column(name = "status",nullable = false)
    private Boolean status = true;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "cartao")
    private List<CartaoClienteGastos> gastos = new ArrayList<>();

    public Double obterTotal(){
        return this.getGastos().stream().mapToDouble(CartaoClienteGastos::getValor).sum();
    }

}
