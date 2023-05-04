package com.doug.backendSelfChop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IniciarAplicacaoService {

    @Autowired
    private SelfServiceService selfServiceService;

    @Autowired
    private UsuarioService usuarioService;

    public void IniciarAplicacao(){
        selfServiceService.criarRegistro();
        usuarioService.criarRegistro();
    }
}
