package com.doug.backendSelfChop.service;

import com.doug.backendSelfChop.domain.CartaoClienteGastos;
import com.doug.backendSelfChop.dto.CartaoClienteGastosDTO;
import com.doug.backendSelfChop.repository.CartaoClienteGastosRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class CartaoClienteGastosService {

    @Autowired
    private final CartaoClienteGastosRepository cartaoClienteGastosRepository;
    ModelMapper modelMapper = new ModelMapper();

    public CartaoClienteGastosDTO cadastrarGasto(CartaoClienteGastosDTO cartaoClienteGastosDTO){
        cartaoClienteGastosDTO.setData(LocalDateTime.now());
        cartaoClienteGastosDTO.setId(null);
        CartaoClienteGastos cartaoClienteGastos = modelMapper.map(cartaoClienteGastosDTO, CartaoClienteGastos.class);
        cartaoClienteGastos = cartaoClienteGastosRepository.save(cartaoClienteGastos);
        return modelMapper.map(cartaoClienteGastos, CartaoClienteGastosDTO.class);
    }
}
