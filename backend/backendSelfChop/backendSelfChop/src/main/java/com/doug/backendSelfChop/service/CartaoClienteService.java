package com.doug.backendSelfChop.service;

import com.doug.backendSelfChop.domain.CartaoCliente;
import com.doug.backendSelfChop.dto.CartaoClienteDTO;
import com.doug.backendSelfChop.dto.CartaoClienteGastosDTO;
import com.doug.backendSelfChop.dto.ClienteDTO;
import com.doug.backendSelfChop.exception.ClientWihoutCheckoutException;
import com.doug.backendSelfChop.exception.ResourceInUseException;
import com.doug.backendSelfChop.repository.CartaoClienteRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

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
        Optional<CartaoCliente> cartaoClienteCheckout= Optional.ofNullable(cartaoClienteRepository.findByRfidWithouCheckout(rfid));
        if (cartaoCliente.isPresent()){
            throw new ResourceInUseException(messageSource.getMessage("Cartao já possui cliente atrelado",new Object[]{cartaoCliente.get().getCliente().getNome()}, Locale.getDefault()));
        } else if (cartaoClienteCheckout.isPresent()) {
            throw new ResourceInUseException(messageSource.getMessage("Cartao atualmente se encontra fechado mas sem Checkout",new Object[]{cartaoCliente.get().getCliente().getNome()}, Locale.getDefault()));
        }
    }

    private void validarClienteComCartao(String cpf) throws ResourceInUseException{
        Optional<CartaoCliente> cartaoCliente = Optional.ofNullable(cartaoClienteRepository.findByCliente(cpf));
        Optional<CartaoCliente> cartaoClienteCheckout = Optional.ofNullable(cartaoClienteRepository.findByCpfWithouCheckout(cpf));
        if (cartaoCliente.isPresent()){
            throw new ResourceInUseException(messageSource.getMessage("Cliente já possui cartão",new Object[]{cartaoCliente.get().getRfid()}, Locale.getDefault()));
        }else if (cartaoClienteCheckout.isPresent()) {
            throw new ResourceInUseException(messageSource.getMessage("Cliente possui cartão fechado mas sem Checkout",new Object[]{cartaoCliente.get().getCliente().getNome()}, Locale.getDefault()));
        }
    }

    //Metodo que procura a classe CartaoCliente com o cpf desejado que está atualmente em aberto
    public CartaoClienteDTO findByCpfOpenCart(String cpf){
        CartaoCliente cartaoCliente = cartaoClienteRepository.findByCliente(cpf);
        return modelMapper.map(cartaoCliente,CartaoClienteDTO.class);
    }

    public CartaoClienteDTO editarCartao(CartaoClienteDTO cartaoClienteDTO){
        CartaoCliente cartaoCliente = modelMapper.map(cartaoClienteDTO, CartaoCliente.class);
        cartaoCliente = cartaoClienteRepository.save(cartaoCliente);
        return modelMapper.map(cartaoCliente, CartaoClienteDTO.class);
    }

    public List<CartaoClienteDTO> findOpenCart(){
        List<CartaoCliente> cartaoClientes = cartaoClienteRepository.findOpenCart();
        return cartaoClientes.stream().map(cartaoCliente -> modelMapper.map(cartaoCliente,CartaoClienteDTO.class)).collect(Collectors.toList());
    }

    public CartaoClienteDTO fecharCartao(String rfid,String metodo){
        CartaoCliente cartaoCliente = cartaoClienteRepository.findByRfid(rfid);
        cartaoCliente.setMetodoPagamento(metodo);
        cartaoCliente.setStatus(false);
        return editarCartao(modelMapper.map(cartaoCliente,CartaoClienteDTO.class));
    }

    public CartaoClienteDTO desvincularCartao(String rfid){
        CartaoCliente cartaoCliente = cartaoClienteRepository.findByRfidWithouCheckout(rfid);
        if (cartaoCliente.obterTotal() == 0.0 || !cartaoCliente.getStatus()){
            cartaoCliente.setSaida(LocalDateTime.now());
            cartaoCliente.setStatus(false);
            return editarCartao(modelMapper.map(cartaoCliente,CartaoClienteDTO.class));
        }
        throw new ClientWihoutCheckoutException("Cliente ainda possui cartão em aberto");
    }

    public Double obterTotal(String rfid){
        CartaoCliente cartaoCliente = cartaoClienteRepository.findByRfid(rfid);
        return cartaoCliente.obterTotal();
    }

    public ClienteDTO clienteByRfid(String rfid){
        CartaoCliente cartaoCliente = cartaoClienteRepository.findByRfid(rfid);
        return modelMapper.map(cartaoCliente.getCliente(), ClienteDTO.class);
    }

    public ClienteDTO clienteByRfidWithouCheckout(String rfid){
        CartaoCliente cartaoCliente = cartaoClienteRepository.findByRfidWithouCheckout(rfid);
        return modelMapper.map(cartaoCliente.getCliente(), ClienteDTO.class);
    }

    public List<CartaoClienteGastosDTO> obterGastos(String rfid){
        return findByRfidOpenCart(rfid).getGastos();
    }

}
