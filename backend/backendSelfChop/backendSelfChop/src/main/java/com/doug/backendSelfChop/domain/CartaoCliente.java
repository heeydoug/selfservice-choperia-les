package com.doug.backendSelfChop.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cpf_cliente", referencedColumnName = "cpf", nullable = false)
    private Cliente cliente;

    @Column(name = "rfid", nullable = false)
    private String rfid;

    @Column(name = "metodo_pagamento")
    private String metodoPagamento;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Column(name = "entrada")
    private LocalDateTime entrada = LocalDateTime.now();

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Column(name = "saida")
    private LocalDateTime saida;

    @Column(name = "status",nullable = false)
    private Boolean status = true;
    //True = Cartão em aberto , False = cartão fechado.

    @JsonIgnoreProperties(value = "cartao")
    @OneToMany(fetch = FetchType.LAZY,mappedBy = "cartao",cascade = CascadeType.ALL)
    private List<CartaoClienteGastos> gastos = new ArrayList<>();

    public Double obterTotal(){
        return this.getGastos().stream().mapToDouble(CartaoClienteGastos::getValor).sum();
    }

}
