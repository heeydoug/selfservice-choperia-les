package com.doug.backendSelfChop.repository;

import com.doug.backendSelfChop.domain.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente,String> {
    Cliente findByCpf(String cpf);

    @Query("SELECT c FROM Cliente c WHERE NOT EXISTS (SELECT cc FROM CartaoCliente cc WHERE cc.cliente = c AND cc.status = true)")
    List<Cliente> findClientWithoutCart();

    @Query("SELECT DISTINCT cc.cliente FROM CartaoCliente cc WHERE cc.status = true")
    List<Cliente> findClientWithCart();

    @Query("SELECT DISTINCT cc.cliente FROM CartaoCliente cc WHERE cc.entrada >= CURRENT_DATE - 30")
    List<Cliente> findClientWithRecentAccount();

    @Query("SELECT DISTINCT cc.cliente FROM CartaoCliente cc WHERE cc.entrada BETWEEN :dataInicio AND :dataFim")
    List<Cliente> findClientWithAccountBetween(@Param("dataInicio") LocalDateTime dataInicio, @Param("dataFim") LocalDateTime dataFim);
}
