package com.doug.backendSelfChop.repository;

import com.doug.backendSelfChop.domain.CartaoClienteGastos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartaoClienteGastosRepository extends JpaRepository<CartaoClienteGastos,Long> {

}
