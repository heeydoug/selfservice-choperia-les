package com.doug.backendSelfChop.controller;

import com.doug.backendSelfChop.domain.Usuario;
import com.doug.backendSelfChop.dto.UsuarioDTO;
import com.doug.backendSelfChop.repository.UsuarioRepository;
import com.doug.backendSelfChop.service.UsuarioService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.net.URI;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping(value = "api/usuarios")
public class UsuarioController {

    private UsuarioRepository usuarioRepository;

    @GetMapping
    public @ResponseBody List<Usuario> list(){
        return usuarioRepository.findAll();
    }

}
    /*
    private final UsuarioService usuarioService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void cadastrarUsuario(@Valid @RequestBody UsuarioDTO usuarioDTO){
        usuarioService.cadastrarUsuario(usuarioDTO);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizarUsuario(@Valid @RequestBody UsuarioDTO usuarioDto) {
        usuarioService.atualizarUsuario(usuarioDto);
    }

    @DeleteMapping("/{cpf}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletarUsuario(@PathVariable @NotEmpty String cpf) {
        usuarioService.deletarUsuario(cpf);
    }

    @GetMapping("{cpf}")
    @ResponseStatus(HttpStatus.OK)
    public UsuarioDTO buscarUsuario(@PathVariable String cpf) {
        return usuarioService.buscarUsuario(cpf);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Set<UsuarioDTO> listarUsuarios() {
        return usuarioService.listarUsuarios();
    }

    @PostMapping
    public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody Usuario obj){
        obj = service.cadastrarUsuario(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{cpf}").buildAndExpand(obj.getCpf()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping(value = "/{cpf}")
    public ResponseEntity<Usuario> buscarUsuario(@PathVariable String cpf){
        Usuario obj = service.buscarUsuario(cpf);
        return ResponseEntity.ok().body(obj);
    }
    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> findAll(){
        List<Usuario> list = service.findAll();
        List<UsuarioDTO> listDTO = list.stream().map(obj -> new UsuarioDTO(obj)).collect(Collectors.toList());
        return ResponseEntity.ok().body(listDTO);
    };


    @PutMapping(value = "/{cpf}")
    public ResponseEntity<UsuarioDTO> atualizarUsuario(@PathVariable String cpf, @RequestBody UsuarioDTO objDto){
        Usuario newObj = service.atualizarUsuario(cpf, objDto);
        return ResponseEntity.ok().body(new UsuarioDTO(newObj));
    }*/

