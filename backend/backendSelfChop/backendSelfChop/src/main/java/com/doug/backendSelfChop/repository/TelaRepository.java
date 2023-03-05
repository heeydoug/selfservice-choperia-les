package com.doug.backendSelfChop.repository;

import com.doug.backendSelfChop.domain.Tela;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TelaRepository extends JpaRepository<Tela, Integer> {
}
