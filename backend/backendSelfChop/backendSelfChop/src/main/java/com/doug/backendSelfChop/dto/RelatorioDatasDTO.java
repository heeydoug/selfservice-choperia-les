package com.doug.backendSelfChop.dto;

import lombok.Getter;

import java.io.Serializable;
import java.util.Date;

@Getter
public class RelatorioDatasDTO implements Serializable {

    private Date dataInicial;

    private Date dataFinal;
}
