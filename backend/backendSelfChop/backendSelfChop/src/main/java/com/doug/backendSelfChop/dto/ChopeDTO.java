package com.doug.backendSelfChop.dto;

import com.doug.backendSelfChop.exception.OutOfStockException;
import lombok.Data;

import java.io.Serializable;

@Data
public class ChopeDTO implements Serializable {

    private String rfid;
    private String nome;
    private Double precoCompra;
    private Double precoCopo;
    private Double saldoEstoque;

    public void setSaldoEstoque(Double saldoEstoque){
        if (saldoEstoque < 0) {
            throw new OutOfStockException("Chope fora de estoque!");
        }
        this.saldoEstoque = saldoEstoque;
    }
    public void saidaChope(){
        this.setSaldoEstoque(this.getSaldoEstoque() - 0.5);
    }
}
