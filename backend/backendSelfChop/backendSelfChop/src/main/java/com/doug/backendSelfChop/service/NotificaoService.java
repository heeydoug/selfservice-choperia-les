package com.doug.backendSelfChop.service;

import com.doug.backendSelfChop.domain.Notificacao;
import com.doug.backendSelfChop.dto.NotificacaoDTO;
import com.doug.backendSelfChop.repository.NotificacaoRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificaoService {

    @Autowired
    private final NotificacaoRepository notificacaoRepository;

    ModelMapper modelMapper = new ModelMapper();


    public NotificacaoDTO findById(Long id_notificao){
        Notificacao notificacao = notificacaoRepository.findById(id_notificao).orElse(null);
        return modelMapper.map(notificacao, NotificacaoDTO.class);
    }
    public NotificacaoDTO cadastrarNotificacao(String mensagem){
        NotificacaoDTO notificacaoDTO = new NotificacaoDTO();
        notificacaoDTO.setMensagem(mensagem);
        notificacaoDTO.setData(LocalDate.now());
        notificacaoDTO.setStatus(false);
        notificacaoRepository.save(modelMapper.map(notificacaoDTO, Notificacao.class));
        return notificacaoDTO;
    }

    public void alterarStatus(Long id_notificao){
        NotificacaoDTO notificacaoDTO = findById(id_notificao);
        notificacaoDTO.setStatus(true);
        notificacaoRepository.save(modelMapper.map(notificacaoDTO, Notificacao.class));
    }


}
