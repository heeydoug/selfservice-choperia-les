package com.doug.backendSelfChop.controller;

import com.doug.backendSelfChop.domain.Cliente;
import com.doug.backendSelfChop.dto.CartaoClienteDTO;
import com.doug.backendSelfChop.dto.ClienteDTO;
import com.doug.backendSelfChop.repository.CartaoClienteRepository;
import com.doug.backendSelfChop.repository.ClienteRepository;
import com.doug.backendSelfChop.service.CartaoClienteService;
import com.doug.backendSelfChop.service.ClienteService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "api/clientes")
public class ClienteController {
    @Autowired
    private final ClienteService clienteService;

    private final ClienteRepository clienteRepository;

    private final CartaoClienteService cartaoClienteService;

    @GetMapping
    public @ResponseBody List<Cliente> list(){
        return clienteRepository.findAll();
    }

    @GetMapping("/sem_cartao")
    public @ResponseBody List<ClienteDTO> withoutCart(){
        return clienteService.findClientWithoutCart();
    }

    @GetMapping("/com_cartao")
    public @ResponseBody List<CartaoClienteDTO> whithCart(){
        return cartaoClienteService.findOpenCart();
    }

    @GetMapping("/{cpf}")
    public ClienteDTO getClienteByCpf(@PathVariable String cpf){
        return clienteService.findByCpf(cpf);
    }

    @PostMapping("/cadastrar")
    public ClienteDTO criarCliente(@RequestBody ClienteDTO clienteDTO){
        return clienteService.criarCliente(clienteDTO);
    }

    @DeleteMapping("/deletar/{cpf}")
    public void deleterCliente(@PathVariable String cpf){
        clienteService.deletarCliente(cpf);
    }

    @PutMapping("/{cpf}")
    public ClienteDTO editarCliente(@RequestBody ClienteDTO clienteDTO){
        return clienteService.editarCliente(clienteDTO);
    }

    @GetMapping("/rfid/{rfid}")
    public ClienteDTO clienteByRfid(@PathVariable String rfid){
        return cartaoClienteService.clienteByRfid(rfid);
    }

}
