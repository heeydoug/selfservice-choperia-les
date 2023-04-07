package com.doug.backendSelfChop.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "notificacao")
public class Notificacao implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_notificao;

    @Column(name = "mensagem", nullable = false)
    private String mensagem;

    @Column(name = "data", nullable = false)
    private LocalDate data;

    @Column(name = "status", nullable = false)
    private Boolean status;

}
