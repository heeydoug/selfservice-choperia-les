package com.doug.backendSelfChop.controller;

import com.doug.backendSelfChop.domain.Produto;
import com.doug.backendSelfChop.dto.EstoqueDTO;
import com.doug.backendSelfChop.dto.ProdutoDTO;
import com.doug.backendSelfChop.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping(value = "api/estoques")
public class EstoqueController {

    private final ProdutoService produtoService;

    @GetMapping("/codigo_barras/{codigoBarras}")
    public ProdutoDTO getByCodigoBarrasEstoque(@PathVariable String codigoBarras){
        return produtoService.getProdutoByCodigoBarras(codigoBarras);
    }

    @PutMapping
    public void atualizarEstoque(@RequestBody EstoqueDTO estoqueDTO){
        produtoService.atualizarEstoque(estoqueDTO);
    }

    @PostMapping("/atualizarEstoque")
    public void atualizarEstoque(@RequestBody List<Produto> produtos){
        produtoService.salvarTodos(produtos);
    }
}
