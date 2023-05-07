package com.doug.backendSelfChop.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class GastosSelfDTO implements Serializable {

    private Double valorTotal;

    private Float peso;

    private String cartao;

}
