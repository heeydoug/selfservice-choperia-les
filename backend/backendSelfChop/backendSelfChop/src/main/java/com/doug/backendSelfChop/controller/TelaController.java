package com.doug.backendSelfChop.controller;

import com.doug.backendSelfChop.domain.Tela;
import com.doug.backendSelfChop.repository.TelaRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "api/telas")
public class TelaController {

    private TelaRepository telaRepository;
    @GetMapping
    public @ResponseBody List<Tela> list(){
        return telaRepository.findAll();
    }

}
