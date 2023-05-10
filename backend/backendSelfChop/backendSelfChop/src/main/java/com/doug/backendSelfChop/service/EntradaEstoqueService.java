package com.doug.backendSelfChop.service;

import com.doug.backendSelfChop.domain.Chope;
import com.doug.backendSelfChop.domain.EntradaEstoque;
import com.doug.backendSelfChop.domain.Produto;
import com.doug.backendSelfChop.repository.ChopeRepository;
import com.doug.backendSelfChop.repository.EntradaEstoqueRepository;
import com.doug.backendSelfChop.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class EntradaEstoqueService {

    @Autowired
    private final EntradaEstoqueRepository entradaEstoqueRepository;

    @Autowired
    private final ChopeRepository chopeRepository;

    private final ProdutoRepository produtoRepository;

    public void EntradaChope(Chope chope){
        Optional<Chope> chopeBD = Optional.ofNullable(chopeRepository.findByRfid(chope.getRfid()));
        if (chopeBD.isEmpty()){
            EntradaEstoque entradaEstoque = new EntradaEstoque(chope.getNome(),chope.getPrecoCompra(),1);
            entradaEstoqueRepository.save(entradaEstoque);
        }else if (chope.getSaldoEstoque() > chopeBD.get().getSaldoEstoque()){
            EntradaEstoque entradaEstoque = new EntradaEstoque(chope.getNome(),chope.getPrecoCompra(),1);
            entradaEstoqueRepository.save(entradaEstoque);
        }
    }

    public void EntradaProduto(Produto produto){
        Optional<Produto> produtoBD = Optional.ofNullable(produtoRepository.findByCodigoBarras(produto.getCodigoBarras()));
        if (produtoBD.isEmpty()){
            EntradaEstoque entradaEstoque = new EntradaEstoque(produto.getNome(),produto.getPrecoCompra(),produto.getSaldoEstoque());
            entradaEstoqueRepository.save(entradaEstoque);
        }else if(produto.getSaldoEstoque() > produtoBD.get().getSaldoEstoque()){
            EntradaEstoque entradaEstoque = new EntradaEstoque(produto.getNome(),produto.getPrecoCompra(),produto.getSaldoEstoque()-produtoBD.get().getSaldoEstoque());
            entradaEstoqueRepository.save(entradaEstoque);
        }
    }

}
