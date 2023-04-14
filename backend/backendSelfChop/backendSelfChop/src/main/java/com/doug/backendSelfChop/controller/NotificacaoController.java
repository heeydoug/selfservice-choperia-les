package com.doug.backendSelfChop.controller;

import com.doug.backendSelfChop.domain.Notificacao;
import com.doug.backendSelfChop.dto.NotificacaoDTO;
import com.doug.backendSelfChop.repository.NotificacaoRepository;
import com.doug.backendSelfChop.service.NotificaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping(value = "api/notificacoes")
public class NotificacaoController {

    private final NotificacaoRepository notificacaoRepository;
    private final NotificaoService notificaoService;

    @GetMapping
    public @ResponseBody List<Notificacao> list(){
        return notificacaoRepository.findAllByCurrentDateAndItemsNotReplaced();
    }

    @GetMapping(value = "/{id_notificacao}")
    public NotificacaoDTO getNotificaoById(@PathVariable Long id_notificacao){
        return notificaoService.findById(id_notificacao);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<NotificacaoDTO> cadastrarNotificacao(@RequestBody String mensagem){
        return ResponseEntity.status(HttpStatus.CREATED).body(notificaoService.cadastrarNotificacao(mensagem));
    }

    @PatchMapping("/alterar_status/{id_notificacao}")
    public ResponseEntity<Void> alterarStatus(@PathVariable Long id_notificacao){
        notificaoService.alterarStatus(id_notificacao);
        return ResponseEntity.noContent().build();
    }
}
