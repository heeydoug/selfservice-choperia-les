package com.doug.backendSelfChop.service;

import com.doug.backendSelfChop.domain.Produto;
import com.doug.backendSelfChop.dto.ProdutoDTO;
import com.doug.backendSelfChop.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ProdutoService {

    @Autowired
    private final ProdutoRepository produtoRepository;

    public ProdutoDTO getProdutoByCodigoBarras(String codigoBarras){
        Produto produto = produtoRepository.findByCodigoBarras(codigoBarras);
        return convertToDTO(produto);
    }

    private ProdutoDTO convertToDTO(Produto produto){
        ProdutoDTO produtoDTO = new ProdutoDTO();
        produtoDTO.setNome(produto.getNome());
        produtoDTO.setCodigoBarras(produto.getCodigoBarras());
        produtoDTO.setSaldoEstoque(produto.getSaldoEstoque());
        produtoDTO.setPrecoCompra(produto.getPrecoCompra());
        produtoDTO.setDescricao(produto.getDescricao());
        produtoDTO.setUnidadeCompra(produto.getUnidadeCompra());
        produtoDTO.setPontoCompra(produto.getPontoCompra());
        return produtoDTO;
    }

    private Produto convertToEntity(ProdutoDTO produtoDTO){
        Produto Produto = new Produto();
        Produto.setNome(produtoDTO.getNome());
        Produto.setCodigoBarras(produtoDTO.getCodigoBarras());
        Produto.setSaldoEstoque(produtoDTO.getSaldoEstoque());
        Produto.setPrecoCompra(produtoDTO.getPrecoCompra());
        Produto.setDescricao(produtoDTO.getDescricao());
        Produto.setUnidadeCompra(produtoDTO.getUnidadeCompra());
        Produto.setUnidadeCompra(produtoDTO.getUnidadeCompra());
        return Produto;
    }

    public ProdutoDTO cadastrarProduto(ProdutoDTO produtoDTO) {
        Produto produto = convertToEntity(produtoDTO);
        produto = produtoRepository.save(produto);
        return convertToDTO(produto);
    }

    public void deleteProduto(String codigoBarras) {
        produtoRepository.deleteByCodigoBarras(codigoBarras);
    }

    public ProdutoDTO editarProduto(ProdutoDTO produtoDTO) {
        produtoRepository.findByCodigoBarras(produtoDTO.getCodigoBarras());
        Produto produto = convertToEntity(produtoDTO);
        produto = produtoRepository.save(produto);
        return  convertToDTO(produto);
    }


}
