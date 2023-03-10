package com.doug.backendSelfChop.domain;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "usuario")
public class Usuario implements Serializable {
    @Id
    @Column(name = "cpf", nullable = false, unique = true, length = 11)
    private String cpf;
    @Column(name = "nome", nullable = false, length = 50)
    private String nome;
    @Column(name = "senha", nullable = false)
    private String senha;
    @ManyToMany
    @JoinTable(name = "usuario_tela", joinColumns = {@JoinColumn(name = "cpf")}, inverseJoinColumns = {@JoinColumn(name = "idTela")})
    private List<Tela> telas;
}
