package com.doug.backendSelfChop.service;

import com.doug.backendSelfChop.domain.PrecoSelfService;
import com.doug.backendSelfChop.dto.CartaoClienteDTO;
import com.doug.backendSelfChop.dto.CartaoClienteGastosDTO;
import com.doug.backendSelfChop.dto.GastosSelfDTO;
import com.doug.backendSelfChop.repository.PrecoSelfServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class SelfServiceService {

    private final CartaoClienteService cartaoClienteService;

    private final CartaoClienteGastosService cartaoClienteGastosService;

    private final PrecoSelfServiceRepository precoSelfServiceRepository;

    public void cadastrarSelf(GastosSelfDTO gastosSelfDTO){
        CartaoClienteDTO cartaoClienteDTO = cartaoClienteService.findByRfidOpenCart(gastosSelfDTO.getCartao());
        String descricao = "Self-Service - Peso: " + String.valueOf(gastosSelfDTO.getPeso()) + "Kg";
        CartaoClienteGastosDTO cartaoClienteGastosDTO = new CartaoClienteGastosDTO(cartaoClienteDTO,gastosSelfDTO.getPreco(),descricao);
        cartaoClienteGastosService.cadastrarGasto(cartaoClienteGastosDTO);
    }

    public Double getPrecoSelf(){
        return precoSelfServiceRepository.findById(1L).get().getPreco();
    }

    public void alterarPreco(Double novoPreco){
        Optional<PrecoSelfService> precoSelfService = precoSelfServiceRepository.findById(1L);
        precoSelfService.get().setPreco(novoPreco);
        precoSelfService.get().setUltimaAlteracao(LocalDateTime.now());
        precoSelfServiceRepository.save(precoSelfService.get());
    }

    public void criarRegistro(){
        Optional<PrecoSelfService> precoSelfService = precoSelfServiceRepository.findById(1L);
        if (precoSelfService.isPresent()){
            return;
        }
        else {
            PrecoSelfService precoSelf = new PrecoSelfService();
            precoSelfServiceRepository.save(precoSelf);
        }
    }
}
