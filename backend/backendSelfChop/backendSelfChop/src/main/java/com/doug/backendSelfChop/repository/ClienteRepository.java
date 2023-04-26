package com.doug.backendSelfChop.repository;

import com.doug.backendSelfChop.domain.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente,String> {
    Cliente findByCpf(String cpf);

    @Query("SELECT c FROM Cliente c WHERE NOT EXISTS (SELECT cc FROM CartaoCliente cc WHERE cc.cliente = c AND cc.status = true)")
    List<Cliente> findClientWithoutCart();

}
