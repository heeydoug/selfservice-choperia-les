package com.doug.backendSelfChop.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
public class GastosChopeDTO implements Serializable {

    private String cartao;

    private String chope;
}
