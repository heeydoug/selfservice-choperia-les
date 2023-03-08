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

    public UsuarioDTO criarUsuario(UsuarioDTO UsuarioDTO) {
        Usuario usuario = convertToEntity(UsuarioDTO);
        usuario = usuarioRepository.save(usuario);
        return convertToDTO(usuario);
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
    /*
    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;

    public void cadastrarUsuario(UsuarioDTO usuarioDTO){
        usuarioRepository.findById(usuarioDTO.getCpf()).ifPresent(u -> {
           throw new ObjectNotFoundException("Usuário não encontrado! CPF: "+ usuarioDTO.getCpf() + ", Tipo: " + Usuario.class.getName());
        });
        Usuario usuario = usuarioMapper.usuarioDtoToUsuario(usuarioDTO);
        usuarioRepository.save(usuario);
    }

    public void atualizarUsuario(UsuarioDTO usuarioDto) {
        usuarioRepository.findById(usuarioDto.getCpf()).orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado! CPF: "+ usuarioDto.getCpf() + ", Tipo: " + Usuario.class.getName()));
        Usuario usuario = usuarioMapper.usuarioDtoToUsuario(usuarioDto);
        usuarioRepository.save(usuario);
    }

    public void deletarUsuario(String cpf) {
        usuarioRepository.deleteById(cpf);
    }

    public UsuarioDTO buscarUsuario(String cpf) {
        Usuario usuario = usuarioRepository.findByCpf(cpf);
        if (Objects.isNull(usuario)) {
            throw new ObjectNotFoundException("Usuário não encontrado!");
        }
        return usuarioMapper.usuarioDtoToUsuario(usuario);
    }

    public Set<UsuarioDTO> listarUsuarios() {
        return usuarioMapper.setUsuarioToSetUsuarioDto(usuarioRepository.findAll());
    }


    private UsuarioRepository repository;
    public Usuario buscarUsuario(String cpf){
        Optional<Usuario> obj = Optional.ofNullable(repository.findByCpf(cpf));
        return obj.orElseThrow(()-> new ObjectNotFoundException("Usuário não encontrado! CPF: "+ cpf + ", Tipo: " + Usuario.class.getName()));
    }

    public List<Usuario> findAll(){
        return repository.findAll();
    }

    public Usuario cadastrarUsuario(Usuario obj){
        return repository.save(obj);
    };

    public Usuario atualizarUsuario(String cpf, UsuarioDTO objDto) {
        Usuario obj = buscarUsuario(cpf);
        obj.setCpf(objDto.getCpf());
        obj.setNome(objDto.getNome());
        obj.setSenha(objDto.getSenha());
        obj.setTelas(objDto.getTelas());
        return repository.save(obj);
    }*/
