package com.doug.backendSelfChop.controller;

import com.doug.backendSelfChop.dto.GastosChopeDTO;
import com.doug.backendSelfChop.dto.GastosSelfDTO;
import com.doug.backendSelfChop.service.ChopeService;
import com.doug.backendSelfChop.service.SelfServiceService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping(value = "api/self_service")
public class SelfServiceController {

    @Autowired
    private final SelfServiceService selfServiceService;

    @PostMapping("/cadastrar")
    public ResponseEntity<Void> servir(@RequestBody GastosSelfDTO gastosSelfDTO){
        selfServiceService.cadastrarSelf(gastosSelfDTO);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/preco")
    public Double obterPreco(){
        return selfServiceService.getPrecoSelf();
    }

    @PutMapping("/preco/alterar")
    public ResponseEntity<Void> alterarPreco(@RequestBody Double novoPreco){
        selfServiceService.alterarPreco(novoPreco);
        return ResponseEntity.noContent().build();
    }
}
