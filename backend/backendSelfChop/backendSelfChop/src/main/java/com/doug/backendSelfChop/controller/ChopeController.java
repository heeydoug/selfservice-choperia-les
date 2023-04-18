package com.doug.backendSelfChop.controller;

import com.doug.backendSelfChop.domain.Chope;
import com.doug.backendSelfChop.dto.ChopeDTO;
import com.doug.backendSelfChop.dto.GastosChopeDTO;
import com.doug.backendSelfChop.repository.ChopeRepository;
import com.doug.backendSelfChop.service.ChopeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "api/chopes")
public class ChopeController {

    @Autowired
    private final ChopeService chopeService;

    private final ChopeRepository chopeRepository;

    @GetMapping
    public @ResponseBody List<Chope> list() {
        return chopeRepository.findAll();
    }

    @GetMapping(value = "/{rfid}")
    public ChopeDTO getChopeByRfid(@PathVariable String rfid) {
        return chopeService.getChopeByRfid(rfid);
    }

    @PostMapping("/cadastrar")
    public ChopeDTO cadastrarChope(@RequestBody ChopeDTO chopeDTO) {
        return chopeService.cadastrarChope(chopeDTO);
    }

    @DeleteMapping("/deletar/{rfid}")
    public void deleteChope(@PathVariable String rfid) {
        chopeService.deleteChope(rfid);
    }

    @PutMapping("/{rfid}")
    public ChopeDTO editarChope(@RequestBody ChopeDTO chopeDTO){
        return chopeService.editarChope(chopeDTO);
    }

    @PostMapping("/servir")
    public ResponseEntity<Void> servir(@RequestBody GastosChopeDTO gastosChopeDTO){
        chopeService.Servir(gastosChopeDTO);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
