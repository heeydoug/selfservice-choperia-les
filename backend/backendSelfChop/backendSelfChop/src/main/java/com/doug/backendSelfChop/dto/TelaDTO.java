package com.doug.backendSelfChop.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
@Data
public class TelaDTO implements Serializable {
    @NotNull
    private Integer idTela;

    @NotEmpty
    @Size(max = 50)
    private String nome;
}