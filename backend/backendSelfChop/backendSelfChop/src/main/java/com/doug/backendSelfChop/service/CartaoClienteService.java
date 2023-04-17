package com.doug.backendSelfChop.service;

import com.doug.backendSelfChop.dto.CartaoClienteDTO;
import com.doug.backendSelfChop.repository.CartaoClienteRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class CartaoClienteService {

    @Autowired
    private final CartaoClienteRepository cartaoClienteRepository;

    ModelMapper modelMapper = new ModelMapper();

    public CartaoClienteDTO acharCartaoAberto(String rfid){
        com.doug.backendSelfChop.domain.CartaoCliente cartaoCliente = cartaoClienteRepository.findByRfid(rfid);
        return modelMapper.map(cartaoCliente, CartaoClienteDTO.class);
    }

    public CartaoClienteDTO cadastrarCartao(CartaoClienteDTO cartaoClienteDTO){
        com.doug.backendSelfChop.domain.CartaoCliente cartaoCliente = modelMapper.map(cartaoClienteDTO, com.doug.backendSelfChop.domain.CartaoCliente.class);
        cartaoCliente.setEntrada(LocalDateTime.now());
        cartaoCliente = cartaoClienteRepository.save(cartaoCliente);
        return modelMapper.map(cartaoCliente, CartaoClienteDTO.class);
    }

    public CartaoClienteDTO acharClienteAberto(String cpf){
        com.doug.backendSelfChop.domain.CartaoCliente cartaoCliente = cartaoClienteRepository.findByCliente(cpf);
        return modelMapper.map(cartaoCliente,CartaoClienteDTO.class);
    }

    public CartaoClienteDTO editarCartao(CartaoClienteDTO cartaoClienteDTO){
        return cadastrarCartao(cartaoClienteDTO);
    }


}
