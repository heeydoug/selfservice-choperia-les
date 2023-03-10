package com.doug.backendSelfChop.service;


import com.doug.backendSelfChop.domain.Usuario;
import com.doug.backendSelfChop.dto.UsuarioDTO;
import com.doug.backendSelfChop.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioDTO getUsuarioByCpf(String cpf) {
        Usuario usuario = usuarioRepository.findByCpf(cpf);
        return convertToDTO(usuario);
    }

    public Usuario criarUsuario(Usuario usuario) {
        //Usuario usuario = convertToEntity(UsuarioDTO);
        usuario = usuarioRepository.save(usuario);
        return usuario;
    }

    public UsuarioDTO editarUsuario(UsuarioDTO UsuarioDTO) {
        Usuario Usuario = convertToEntity(UsuarioDTO);
        Usuario = usuarioRepository.save(Usuario);
        return convertToDTO(Usuario);
    }

    public void deletarUsuario(String cpf) {
        usuarioRepository.deleteById(cpf);
    }

    private UsuarioDTO convertToDTO(Usuario Usuario) {
        UsuarioDTO UsuarioDTO = new UsuarioDTO();
        UsuarioDTO.setNome(Usuario.getNome());
        UsuarioDTO.setCpf(Usuario.getCpf());
        UsuarioDTO.setSenha(Usuario.getSenha());
        return UsuarioDTO;
    }

    private Usuario convertToEntity(UsuarioDTO UsuarioDTO) {
        Usuario Usuario = new Usuario();
        UsuarioDTO.setNome(Usuario.getNome());
        UsuarioDTO.setCpf(Usuario.getCpf());
        UsuarioDTO.setSenha(Usuario.getSenha());
        return Usuario;
    }
}
