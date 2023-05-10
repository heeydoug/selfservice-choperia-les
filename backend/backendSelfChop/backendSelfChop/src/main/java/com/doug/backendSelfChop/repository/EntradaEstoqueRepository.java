package com.doug.backendSelfChop.repository;

import com.doug.backendSelfChop.domain.EntradaEstoque;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntradaEstoqueRepository extends JpaRepository<EntradaEstoque,Long>{

}
