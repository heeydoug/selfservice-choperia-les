package com.doug.backendSelfChop.service;

import com.doug.backendSelfChop.domain.CartaoCliente;
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

    //Metodo que procura a classe CartaoCliente com o rfid desejado que está atualmente em aberto
    public CartaoClienteDTO findByRfidOpenCart(String rfid){
        CartaoCliente cartaoCliente = cartaoClienteRepository.findByRfid(rfid);
        return modelMapper.map(cartaoCliente, CartaoClienteDTO.class);
    }

    public CartaoClienteDTO cadastrarCartao(CartaoClienteDTO cartaoClienteDTO){
        CartaoCliente cartaoCliente = modelMapper.map(cartaoClienteDTO, CartaoCliente.class);
        cartaoCliente.setEntrada(LocalDateTime.now());
        cartaoCliente = cartaoClienteRepository.save(cartaoCliente);
        return modelMapper.map(cartaoCliente, CartaoClienteDTO.class);
    }

    //Metodo que procura a classe CartaoCliente com o cpf desejado que está atualmente em aberto
    public CartaoClienteDTO findByCpfOpenCart(String cpf){
        CartaoCliente cartaoCliente = cartaoClienteRepository.findByCliente(cpf);
        return modelMapper.map(cartaoCliente,CartaoClienteDTO.class);
    }

    public CartaoClienteDTO editarCartao(CartaoClienteDTO cartaoClienteDTO){
        return cadastrarCartao(cartaoClienteDTO);
    }


}
