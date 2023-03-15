package com.doug.backendSelfChop.controller;

import com.doug.backendSelfChop.domain.Produto;
import com.doug.backendSelfChop.dto.ProdutoDTO;
import com.doug.backendSelfChop.repository.ProdutoRepository;
import com.doug.backendSelfChop.service.ProdutoService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping (value = "api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    private ProdutoRepository produtoRepository;

    @GetMapping
    public @ResponseBody List<Produto> list() {
        return produtoRepository.findAll();
    }

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

    @PutMapping("/{codigoBarras}")
    public ProdutoDTO editarProduto(@RequestBody ProdutoDTO produtoDTO){
        return produtoService.editarProduto(produtoDTO);
    }

}
