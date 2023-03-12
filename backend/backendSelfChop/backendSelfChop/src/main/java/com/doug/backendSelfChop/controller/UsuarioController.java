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
@AllArgsConstructor
@RequestMapping(value = "api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public @ResponseBody List<Usuario> list(){
        return usuarioRepository.findAll();
    }

    @GetMapping("/{cpf}")
    public UsuarioDTO getUsuarioByCpf(@PathVariable String cpf) {
        return usuarioService.findByCpf(cpf);
    }

    @PostMapping("/cadastrar")
    public UsuarioDTO criarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        return usuarioService.criarUsuario(usuarioDTO);
    }
    @DeleteMapping("/deletar/{cpf}")
    public void deletarUsuario(@PathVariable String cpf) {
        usuarioService.deletarUsuario(cpf);
    }
    @PutMapping("/{cpf}")
    public UsuarioDTO editarUsario(@RequestBody UsuarioDTO usuarioDTO) {
        return usuarioService.editarUsuario(usuarioDTO);
    }

}

