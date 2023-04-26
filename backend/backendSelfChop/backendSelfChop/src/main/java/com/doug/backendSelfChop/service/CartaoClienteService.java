package com.doug.backendSelfChop.service;

import com.doug.backendSelfChop.domain.CartaoCliente;
import com.doug.backendSelfChop.dto.CartaoClienteDTO;
import com.doug.backendSelfChop.exception.ResourceInUseException;
import com.doug.backendSelfChop.repository.CartaoClienteRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CartaoClienteService {

    @Autowired
    private final CartaoClienteRepository cartaoClienteRepository;

    private final MessageSource messageSource;

    ModelMapper modelMapper = new ModelMapper();

    //Metodo que procura a classe CartaoCliente com o rfid desejado que está atualmente em aberto
    public CartaoClienteDTO findByRfidOpenCart(String rfid){
        CartaoCliente cartaoCliente = cartaoClienteRepository.findByRfid(rfid);
        return modelMapper.map(cartaoCliente, CartaoClienteDTO.class);
    }

    public CartaoClienteDTO cadastrarCartao(CartaoClienteDTO cartaoClienteDTO){
        validarCartaoEmUso(cartaoClienteDTO.getRfid());
        validarClienteComCartao(cartaoClienteDTO.getCliente().getCpf());
        CartaoCliente cartaoCliente = modelMapper.map(cartaoClienteDTO, CartaoCliente.class);
        cartaoCliente.setEntrada(LocalDateTime.now());
        cartaoCliente = cartaoClienteRepository.save(cartaoCliente);
        return modelMapper.map(cartaoCliente, CartaoClienteDTO.class);
    }

    private void validarCartaoEmUso(String rfid) throws ResourceInUseException{
        Optional<CartaoCliente> cartaoCliente = Optional.ofNullable(cartaoClienteRepository.findByRfid(rfid));
        if (cartaoCliente.isPresent()){
            throw new ResourceInUseException(messageSource.getMessage("Cartao já possui cliente atrelado",new Object[]{cartaoCliente.get().getCliente().getNome()}, Locale.getDefault()));
        }
    }

    private void validarClienteComCartao(String rfid) throws ResourceInUseException{
        Optional<CartaoCliente> cartaoCliente = Optional.ofNullable(cartaoClienteRepository.findByRfid(rfid));
        if (cartaoCliente.isPresent()){
            throw new ResourceInUseException(messageSource.getMessage("Cliente já possui cartão",new Object[]{cartaoCliente.get().getRfid()}, Locale.getDefault()));
        }
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
