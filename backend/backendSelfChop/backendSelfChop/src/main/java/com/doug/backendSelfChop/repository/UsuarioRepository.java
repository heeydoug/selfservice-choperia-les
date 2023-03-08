package com.doug.backendSelfChop.repository;

import com.doug.backendSelfChop.domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, String> {
    Usuario findByCpf(String cpf);

}
