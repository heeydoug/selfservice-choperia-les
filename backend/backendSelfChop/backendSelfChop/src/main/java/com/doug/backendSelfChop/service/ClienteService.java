package com.doug.backendSelfChop.service;

import com.doug.backendSelfChop.domain.Cliente;
import com.doug.backendSelfChop.dto.ClienteDTO;
import com.doug.backendSelfChop.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ClienteService {

    @Autowired
    private final ClienteRepository clienteRepository;
    ModelMapper modelMapper = new ModelMapper();

    public ClienteDTO findByCpf(String cpf){
        Cliente cliente = clienteRepository.findByCpf(cpf);
        return modelMapper.map(cliente, ClienteDTO.class);
        //Transforma a primeira classe (cliente) na classe da segunda (cliente DTO)
    }

    public ClienteDTO criarCliente(ClienteDTO clienteDTO){
        Cliente cliente = modelMapper.map(clienteDTO,Cliente.class);
        clienteRepository.save(cliente);
        return modelMapper.map(cliente,ClienteDTO.class);
    }

    public ClienteDTO editarCliente(ClienteDTO clienteDTO){
        return criarCliente(clienteDTO);
    }

    public void deletarCliente(String cpf){
        clienteRepository.deleteById(cpf);
    }

    public List<ClienteDTO> findClientWithoutCart(){
        List<Cliente> clientes = clienteRepository.findClientWithoutCart();
        return clientes.stream()
                .map(cliente -> modelMapper.map(cliente, ClienteDTO.class))
                .collect(Collectors.toList());
    }
}
