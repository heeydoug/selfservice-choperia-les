package com.doug.backendSelfChop.service;

import com.doug.backendSelfChop.domain.Chope;
import com.doug.backendSelfChop.dto.CartaoClienteDTO;
import com.doug.backendSelfChop.dto.CartaoClienteGastosDTO;
import com.doug.backendSelfChop.dto.ChopeDTO;
import com.doug.backendSelfChop.dto.GastosChopeDTO;
import com.doug.backendSelfChop.repository.ChopeRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ChopeService {

    @Autowired
    private final ChopeRepository chopeRepository;
    ModelMapper modelMapper = new ModelMapper();

    private final CartaoClienteService cartaoClienteService;

    private final CartaoClienteGastosService cartaoClienteGastosService;

    public ChopeDTO getChopeByRfid(String rfid){
        Chope chope = chopeRepository.findByRfid(rfid);
        return modelMapper.map(chope,ChopeDTO.class);
    }

    public ChopeDTO cadastrarChope(ChopeDTO chopeDTO){
        Chope chope = modelMapper.map(chopeDTO, Chope.class);
        chope = chopeRepository.save(chope);
        return modelMapper.map(chope, ChopeDTO.class);
    }

    public void Servir(GastosChopeDTO gastosChopeDTO){
        ChopeDTO chopeDTO = getChopeByRfid(gastosChopeDTO.getChope());
        cadastrarGastoChope(gastosChopeDTO,chopeDTO);
        chopeDTO.saidaChope();
        editarChope(chopeDTO);
    }

    public void deleteChope(String rfid){
        chopeRepository.deleteByRfid(rfid);
    }

    public ChopeDTO editarChope(ChopeDTO chopeDTO){
        return cadastrarChope(chopeDTO);
    }

    public void salvarTodos(List<Chope> chopesList){
        chopeRepository.saveAll(chopesList);
    }

    private void cadastrarGastoChope(GastosChopeDTO gastosChopeDTO, ChopeDTO chopeDTO){
        CartaoClienteDTO cartaoClienteDTO = cartaoClienteService.acharCartaoAberto(gastosChopeDTO.getCartao());
        String descricao = chopeDTO.getNome();
        CartaoClienteGastosDTO cartaoClienteGastosDTO = new CartaoClienteGastosDTO(cartaoClienteDTO,chopeDTO.getPrecoCopo(),descricao);
        cartaoClienteGastosService.cadastrarGasto(cartaoClienteGastosDTO);
    }
}
