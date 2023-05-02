package com.doug.backendSelfChop.controller;

import com.doug.backendSelfChop.dto.CartaoClienteDTO;
import com.doug.backendSelfChop.dto.CartaoClienteGastosDTO;
import com.doug.backendSelfChop.dto.GastosChopeDTO;
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
    private final CartaoClienteService cartaoCliente;

    @Autowired
    private final CartaoClienteGastosService cartaoClienteGastosService;

    @Autowired
    private final CartaoClienteRepository cartaoClienteRepository;

    @GetMapping("/rfid/{rfid}")
    public CartaoClienteDTO findByRfidOpenCart(@PathVariable String rfid){
        return  cartaoCliente.findByRfidOpenCart(rfid);
    }

    @GetMapping("/cpf/{cpf}")
    public CartaoClienteDTO findByCpfOpenCart(@PathVariable String cpf){
        return cartaoCliente.findByCpfOpenCart(cpf);
    }

    @PostMapping("/cadastrar")
    public CartaoClienteDTO cadastrarCartao(@RequestBody CartaoClienteDTO cartaoClienteDTO){
        return cartaoCliente.cadastrarCartao(cartaoClienteDTO);
    }

    @PutMapping("/editar")
    public CartaoClienteDTO editarCartao(@RequestBody CartaoClienteDTO cartaoClienteDTO){
        return cartaoCliente.editarCartao(cartaoClienteDTO);
    }

    @PostMapping("/gastos/cadastrar")
    public CartaoClienteGastosDTO cadastrarGastos(@RequestBody CartaoClienteGastosDTO cartaoClienteGastosDTO){
        return cartaoClienteGastosService.cadastrarGasto(cartaoClienteGastosDTO);
    }

    @PutMapping("/fechar/{rfid}")
    public CartaoClienteDTO fecharCartao(@PathVariable String rfid,@RequestBody String metodo){
        return cartaoCliente.fecharCartao(rfid, metodo);
    }

    @PutMapping("/desvincular/{rfid}")
    public CartaoClienteDTO desvincularCartao(@PathVariable String rfid){
        return cartaoCliente.desvincularCartao(rfid);
    }

    @GetMapping("/total/{rfid}")
    public Double obterTotal(@PathVariable String rfid){
        return cartaoCliente.obterTotal(rfid);
    }

    @GetMapping("/gastos/{rfid}")
    public @ResponseBody List<CartaoClienteGastosDTO> obterGastos(@PathVariable String rfid){
        return cartaoCliente.obterGastos(rfid);
    }

    @GetMapping("/nome/{rfid}")
    public String obterNomeCliente(@PathVariable String rfid){
        return cartaoCliente.clienteByRfidToUnlik(rfid).getNome();
    }
}
