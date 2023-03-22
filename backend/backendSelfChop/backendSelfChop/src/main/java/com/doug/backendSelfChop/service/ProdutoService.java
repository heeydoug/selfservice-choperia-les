package com.doug.backendSelfChop.service;

import com.doug.backendSelfChop.domain.Produto;
import com.doug.backendSelfChop.dto.EstoqueDTO;
import com.doug.backendSelfChop.dto.ProdutoDTO;
import com.doug.backendSelfChop.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProdutoService {

    @Autowired
    private final ProdutoRepository produtoRepository;

    ModelMapper modelMapper = new ModelMapper();

    public ProdutoDTO getProdutoByCodigoBarras(String codigoBarras){
        Produto produto = produtoRepository.findByCodigoBarras(codigoBarras);
        //return convertToDTO(produto);
        return  modelMapper.map(produto,ProdutoDTO.class);
    }

    public ProdutoDTO cadastrarProduto(ProdutoDTO produtoDTO) {
        //Produto produto = convertToEntity(produtoDTO);
        Produto produto = modelMapper.map(produtoDTO,Produto.class);
        produto = produtoRepository.save(produto);
        //return convertToDTO(produto);
        return modelMapper.map(produto,ProdutoDTO.class);
    }

    public void deleteProduto(String codigoBarras) {
        produtoRepository.deleteByCodigoBarras(codigoBarras);
    }

    public ProdutoDTO editarProduto(ProdutoDTO produtoDTO) {
        produtoRepository.findByCodigoBarras(produtoDTO.getCodigoBarras());
        //Produto produto = convertToEntity(produtoDTO);
        Produto produto = modelMapper.map(produtoDTO,Produto.class);
        produto = produtoRepository.save(produto);
        //return convertToDTO(produto);
        return  modelMapper.map(produto,ProdutoDTO.class);
    }


    public void atualizarEstoque(EstoqueDTO estoqueDTO) {
        Produto produto = produtoRepository.findByCodigoBarras(estoqueDTO.getCodigoBarras());
        produto.setSaldoEstoque(estoqueDTO.getSaldoEstoque());
        produtoRepository.save(produto);
    }

    public void salvarTodos(List<Produto> produtosList){
        produtoRepository.saveAll(produtosList);
    }

}
