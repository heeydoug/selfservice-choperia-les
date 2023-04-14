package com.doug.backendSelfChop.repository;

import com.doug.backendSelfChop.domain.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente,String> {
    Cliente findByCpf(String cpf);
}
