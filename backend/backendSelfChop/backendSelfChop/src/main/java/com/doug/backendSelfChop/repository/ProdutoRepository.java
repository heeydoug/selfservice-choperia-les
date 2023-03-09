package com.doug.backendSelfChop.repository;

import com.doug.backendSelfChop.domain.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {

    Produto findByCodigoBarras(String codigoBarras);
    String deleteByCodigoBarras(String codigoBarras);
}
