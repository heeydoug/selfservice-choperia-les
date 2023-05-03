package com.doug.backendSelfChop.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "cartao_cliente_gastos")
public class CartaoClienteGastos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cartao_cliente", referencedColumnName = "id", nullable = false)
    private CartaoCliente cartao;

    @Column(name = "valor", nullable = false)
    private Double valor = 0.0;

    @Column(name = "descricao", nullable = false)
    private String descricao;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Column(name = "data", nullable = false)
    private LocalDateTime data;
}
