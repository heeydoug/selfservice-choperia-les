package com.doug.backendSelfChop.controller;

import com.doug.backendSelfChop.domain.CartaoCliente;
import com.doug.backendSelfChop.dto.CartaoClienteDTO;
import com.doug.backendSelfChop.dto.CartaoClienteGastosDTO;
import com.doug.backendSelfChop.repository.CartaoClienteRepository;
import com.doug.backendSelfChop.service.CartaoClienteGastosService;
import com.doug.backendSelfChop.service.CartaoClienteService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "api/cartao/cliente")
public class CartaoClienteController {

    @Autowired
    private final CartaoClienteService cartaoClienteService;

    @Autowired
    private final CartaoClienteGastosService cartaoClienteGastosService;

    @Autowired
    private final CartaoClienteRepository cartaoClienteRepository;

    @GetMapping
    public @ResponseBody List<CartaoCliente> list(){return cartaoClienteRepository.findAll();}

    @GetMapping("/rfid/{rfid}")
    public CartaoClienteDTO acharCartaoAberto(@PathVariable String rfid){
        return cartaoClienteService.acharCartaoAberto(rfid);
    }

    @GetMapping("/cpf/{cpf}")
    public CartaoClienteDTO acharClienteAberto(@PathVariable String cpf){
        return cartaoClienteService.acharClienteAberto(cpf);
    }

    @PostMapping("/cadastrar")
    public CartaoClienteDTO cadastrarCartao(@RequestBody CartaoClienteDTO cartaoClienteDTO){
        return cartaoClienteService.cadastrarCartao(cartaoClienteDTO);
    }

    @PutMapping("/editar")
    public CartaoClienteDTO editarCartao(@RequestBody CartaoClienteDTO cartaoClienteDTO){
        return cartaoClienteService.editarCartao(cartaoClienteDTO);
    }

    @PostMapping("/gastos/cadastrar")
    public CartaoClienteGastosDTO cadastrarGastos(@RequestBody CartaoClienteGastosDTO cartaoClienteGastosDTO){
        return cartaoClienteGastosService.cadastrarGasto(cartaoClienteGastosDTO);
    }
}
