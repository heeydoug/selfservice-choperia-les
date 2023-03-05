package com.doug.backendSelfChop.domain;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Data
@Entity
@Table(name = "tela")
public class Tela implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTela;
    @Column(name = "nome", nullable = false, length = 50)
    private String nome;
}
