package com.doug.backendSelfChop.controller;

import com.doug.backendSelfChop.dto.ProdutoDTO;
import com.doug.backendSelfChop.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping (value = "api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping(value = "/{codigoBarras}")
    public ProdutoDTO getProdutoByCodigoBarras(@PathVariable String codigoBarras){
        return produtoService.getProdutoByCodigoBarras(codigoBarras);
    }

    @PostMapping("/cadastrar")
    public  ProdutoDTO cadastrarProduto(@RequestBody ProdutoDTO produtoDTO){
        return produtoService.cadastrarProduto(produtoDTO);
    }

    @DeleteMapping("/deletar/{codigoBarras}")
    public void deleteProduto(@PathVariable String codigoBarras){
        produtoService.deleteProduto(codigoBarras);
    }

    @PutMapping("/")
    public ProdutoDTO uptadeProduto(@RequestBody ProdutoDTO produtoDTO){
        return produtoService.editarProduto(produtoDTO);
    }
}
