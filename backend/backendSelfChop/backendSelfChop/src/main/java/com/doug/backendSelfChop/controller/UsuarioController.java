package com.doug.backendSelfChop.controller;

import com.doug.backendSelfChop.domain.Usuario;
import com.doug.backendSelfChop.dto.UsuarioDTO;
import com.doug.backendSelfChop.repository.UsuarioRepository;
import com.doug.backendSelfChop.service.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value = "api/usuarios")
public class UsuarioController {
    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    private UsuarioRepository usuarioRepository;

    @GetMapping
    public @ResponseBody List<Usuario> list(){
        return usuarioRepository.findAll();
    }

    @GetMapping("/{cpf}")
    public Usuario getUsuarioByCpf(@PathVariable String cpf) {
        return usuarioRepository.findByCpf(cpf);
    }

    @PostMapping("/cadastrar")
    public Usuario criarUsuario(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @PutMapping("/editar")
    public Usuario editarUser(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
    @DeleteMapping("/{cpf}")
    public void deleteUser(@PathVariable String cpf) {
        usuarioRepository.deleteById(cpf);
    }

}

