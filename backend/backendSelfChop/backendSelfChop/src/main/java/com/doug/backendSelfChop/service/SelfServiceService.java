package com.doug.backendSelfChop.service;

import com.doug.backendSelfChop.dto.CartaoClienteDTO;
import com.doug.backendSelfChop.dto.CartaoClienteGastosDTO;
import com.doug.backendSelfChop.dto.GastosSelfDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class SelfServiceService {

    private final CartaoClienteService cartaoClienteService;

    private final CartaoClienteGastosService cartaoClienteGastosService;

    public void cadastrarSelf(GastosSelfDTO gastosSelfDTO){
        CartaoClienteDTO cartaoClienteDTO = cartaoClienteService.findByRfidOpenCart(gastosSelfDTO.getCartao());
        String descricao = "Self-Service - Peso: " + String.valueOf(gastosSelfDTO.getPeso()) + "Kg";
        CartaoClienteGastosDTO cartaoClienteGastosDTO = new CartaoClienteGastosDTO(cartaoClienteDTO,gastosSelfDTO.getPreco(),descricao);
        cartaoClienteGastosService.cadastrarGasto(cartaoClienteGastosDTO);
    }
}
