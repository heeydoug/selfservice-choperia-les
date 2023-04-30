package com.doug.backendSelfChop.domain;

import com.doug.backendSelfChop.exception.OutOfStockException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.io.Serializable;

@Data
@Entity
@Table(name = "chope")
public class Chope implements Serializable {

    @Id
    @Column(name = "rfid", nullable = false, unique = true, length = 50)
    private String rfid;
    @Column(name = "nome", nullable = false, length = 50)
    private String nome;
    @Column(name = "preco_compra", nullable = false)
    private Double precoCompra;
    @Column(name = "preco_copo", nullable = false)
    private Double precoCopo;
    @Column(name = "saldo_estoque", nullable = false)
    private Double saldoEstoque;

    public void setSaldoEstoque(Double saldoEstoque){
        if (saldoEstoque < 0) {
            throw new OutOfStockException("Chope fora de estoque!");
        }
        this.saldoEstoque = saldoEstoque;
    }
}
