package com.doug.backendSelfChop.repository;

import com.doug.backendSelfChop.domain.CartaoCliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartaoClienteRepository extends JpaRepository<CartaoCliente,Long> {

    @Query("SELECT cartao FROM CartaoCliente cartao WHERE cartao.rfid = :rfid and cartao.status = TRUE")
    CartaoCliente findByRfid(@Param("rfid")String rfid);

    @Query("SELECT cartao FROM CartaoCliente cartao WHERE cartao.cliente.cpf = :cpf and cartao.status = TRUE")
    CartaoCliente findByCliente(@Param("cpf")String cpf);

    @Query("SELECT cartao FROM CartaoCliente cartao WHERE cartao.status = TRUE")
    List<CartaoCliente> findOpenCart();
}
