package com.doug.backendSelfChop.dto;

import lombok.*;

import java.io.Serializable;
import java.util.Set;

@Data
public class UsuarioDTO implements Serializable {

    private String cpf;
    private String nome;
    private String senha;
    private Set<TelaDTO> telas;
}

/*
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private String cpf;
    private String nome;
    private String senha;
    private List<Tela> telas;

    public UsuarioDTO(Usuario obj) {
        this.cpf = obj.getCpf();
        this.nome = obj.getNome();
        this.senha = obj.getSenha();
        this.telas = obj.getTelas();
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public List<Tela> getTelas() {
        return telas;
    }

    public void setTelas(List<Tela> telas) {
        this.telas = telas;
    }
}
*/