package com.doug.backendSelfChop.controller;

import com.doug.backendSelfChop.domain.Chope;
import com.doug.backendSelfChop.dto.ChopeDTO;
import com.doug.backendSelfChop.service.ChopeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@AllArgsConstructor
@RequestMapping(value = "api/estoques/chopes")
public class EstoqueChopeController {

    @Autowired
    private final ChopeService chopeService;

    @GetMapping("/rfid/{rfid}")
    public ChopeDTO getByRfidEstoque(@PathVariable String rfid){
        return chopeService.getChopeByRfid(rfid);
    }

    @PostMapping("/atualizarEstoque")
    public void atualizarEstoque(@RequestBody List<Chope> chopes){
        chopeService.salvarTodos(chopes);
    }
}
