package com.doug.backendSelfChop.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.io.Serializable;

@Data
@Entity
@Table(name = "cliente")
public class Cliente implements Serializable {

    @Column(name = "rfid",nullable = true,unique = true)
    private String rfid;
    @Column(name = "telefone", nullable = false, length = 11)
    private String telefone;
    @Column(name = "nome", nullable = false, length = 50)
    private String nome;
    @Column(name = "email", nullable = false, length = 50)
    private String email;
    @Id
    @Column(name = "cpf", unique = true,nullable = false,length = 11)
    private String cpf;
}
