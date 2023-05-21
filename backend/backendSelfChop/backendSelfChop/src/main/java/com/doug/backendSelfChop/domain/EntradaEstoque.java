package com.doug.backendSelfChop.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class EntradaEstoque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "preco_compra")
    private Double precoCompra;

    @Column(name = "quantidade")
    private Integer quantidade;

    @Column(name = "data_entrada")
    private LocalDateTime dataEntrada;

    public EntradaEstoque(String nome, Double precoCompra, Integer quantidade,String tipo) {
        this.nome = nome;
        this.precoCompra = precoCompra;
        this.quantidade = quantidade;
        this.tipo = tipo;
        this.dataEntrada = LocalDateTime.now();
    }
}
