package com.doug.backendSelfChop.controller;

import com.doug.backendSelfChop.dto.RelatorioDatasDTO;
import com.doug.backendSelfChop.service.RelatorioService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.Date;

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

    @GetMapping("/gastos")
    public ResponseEntity<byte[]> gerarRelatorioGastos(@RequestParam("dataInicio") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataInicio, @RequestParam("dataFinal") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataFinal) throws JRException, SQLException {
        byte[] pdf = relatorioService.gerarRelatorioGastos(dataInicio,dataFinal);
        org.springframework.http.HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "relatorio-gastos-clientes.pdf");
        return ResponseEntity.ok().headers(headers).body(pdf);
    }

    @GetMapping("/falta-estoque")
    public ResponseEntity<byte[]> gerarRelatorioFaltaEstoque() throws JRException, SQLException {
        byte[] pdf = relatorioService.gerarRelatorioFaltaEstoque();

        org.springframework.http.HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "relatorio-falta-estoque.pdf");

        return ResponseEntity.ok().headers(headers).body(pdf);
    }

    @GetMapping("/chopes-mais-vendidos")
    public ResponseEntity<byte[]> gerarRelatorioChopesMaisVendidos(@RequestParam("dataInicio") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataInicio, @RequestParam("dataFinal") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataFinal) throws JRException, SQLException {
        byte[] pdf = relatorioService.gerarRelatorioChopesMaisVendidos(dataInicio,dataFinal);
        org.springframework.http.HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "relatorio-chopes-mais-vendidos.pdf");
        return ResponseEntity.ok().headers(headers).body(pdf);
    }

    @GetMapping("/despesas")
    public ResponseEntity<byte[]> gerarRelatorioDespesas(@RequestParam("dataInicio") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataInicio, @RequestParam("dataFinal") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataFinal) throws JRException, SQLException {
        byte[] pdf = relatorioService.gerarRelatorioDespesas(dataInicio,dataFinal);
        org.springframework.http.HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "relatorio-despesas.pdf");
        return ResponseEntity.ok().headers(headers).body(pdf);
    }
}
