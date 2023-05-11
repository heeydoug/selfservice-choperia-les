package com.doug.backendSelfChop.controller;

import com.doug.backendSelfChop.service.RelatorioService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.sql.SQLException;

@RestController
@AllArgsConstructor
@RequestMapping(value = "api/relatorios")
public class RelatorioController {
    @Autowired
    private RelatorioService relatorioService;

    @GetMapping("/estoque")
    public ResponseEntity<byte[]> gerarRelatorioEstoque() throws JRException, SQLException {
        byte[] pdf = relatorioService.gerarRelatorioEstoque();

        org.springframework.http.HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "relatorio-estoque.pdf");

        return ResponseEntity.ok().headers(headers).body(pdf);
    }
}
