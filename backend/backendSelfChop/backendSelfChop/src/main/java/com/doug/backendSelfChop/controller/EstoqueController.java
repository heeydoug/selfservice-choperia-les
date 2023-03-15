package com.doug.backendSelfChop.controller;

import com.doug.backendSelfChop.dto.EstoqueDTO;
import com.doug.backendSelfChop.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping(value = "api/estoques")
public class EstoqueController {

    private final ProdutoService produtoService;

    @GetMapping("/codigo_barras/{codigoBarras}")
    public EstoqueDTO getByCodigoBarrasEstoque(@PathVariable String codigoBarras){
        return produtoService.getByCodigoBarrasEstoque(codigoBarras);
    }

    @PutMapping
    public void atualizarEstoque(@RequestBody EstoqueDTO estoqueDTO){
        produtoService.atualizarEstoque(estoqueDTO);
    }
}
