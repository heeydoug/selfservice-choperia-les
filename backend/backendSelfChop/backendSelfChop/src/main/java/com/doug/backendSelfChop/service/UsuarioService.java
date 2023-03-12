package com.doug.backendSelfChop.service;


import com.doug.backendSelfChop.domain.Produto;
import com.doug.backendSelfChop.domain.Usuario;
import com.doug.backendSelfChop.dto.ProdutoDTO;
import com.doug.backendSelfChop.dto.UsuarioDTO;
import com.doug.backendSelfChop.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

@Service
@RequiredArgsConstructor
@Transactional
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioDTO findByCpf(String cpf){
        Usuario usuario = usuarioRepository.findByCpf(cpf);
        return convertToDTO(usuario);
    }

    ModelMapper modelMapper = new ModelMapper();

    public UsuarioDTO getUsuarioByCpf(String cpf) {
        Usuario usuario = usuarioRepository.findByCpf(cpf);
        return convertToDTO(usuario);
    }

    public UsuarioDTO criarUsuario(UsuarioDTO usuarioDTO) {
        //Usuario usuario = convertToEntity(usuarioDTO);
        Usuario usuario = modelMapper.map(usuarioDTO,Usuario.class);
        usuario = usuarioRepository.save(usuario);
        return convertToDTO(usuario);
    }

    public UsuarioDTO editarUsuario(UsuarioDTO usuarioDTO) {
        //Usuario Usuario = convertToEntity(UsuarioDTO);
        Usuario usuario = modelMapper.map(usuarioDTO,Usuario.class);
        usuario = usuarioRepository.save(usuario);
        return convertToDTO(usuario);
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
