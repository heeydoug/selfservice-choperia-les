package com.doug.backendSelfChop.domain;


import jakarta.persistence.*;
import lombok.*;
import java.io.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "produto")
public class Produto implements Serializable {
    @Column(name = "nome", nullable = false, length = 150)
    private String nome;
    @Id
    @Column(name = "codigo_barras", nullable = false, unique = true, length = 50)
    private String codigoBarras;
    @Column(name = "saldo_estoque", nullable = false)
    private Integer saldoEstoque;
    @Column(name = "preco_compra", nullable = false)
    private Double precoCompra;
    @Column(name = "descricao", nullable = false)
    private String descricao;
    @Column(name = "unidade_compra", nullable = false)
    private String unidadeCompra;
    @Column(name = "ponto_compra", nullable = false)
    private Integer pontoCompra;

}
