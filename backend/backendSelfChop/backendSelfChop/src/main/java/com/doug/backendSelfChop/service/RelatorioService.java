package com.doug.backendSelfChop.service;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import com.doug.backendSelfChop.dto.RelatorioDatasDTO;
import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimplePdfExporterConfiguration;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class RelatorioService {


    public byte[] gerarRelatorioEstoque() throws JRException, SQLException {
        Connection connection = getConnection();
        JasperReport jasperReport = JasperCompileManager.compileReport(
                getClass().getResourceAsStream("/relatorios/relatorio-estoque.jrxml")
        );

        Map<String, Object> params = new HashMap<>();
        params.put(JRParameter.REPORT_CONNECTION, connection);

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, connection);
        connection.close();
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

    public byte[] gerarRelatorioGastos(RelatorioDatasDTO datas) throws JRException, SQLException {
        Connection connection = getConnection();
        JasperReport jasperReport = JasperCompileManager.compileReport(
                getClass().getResourceAsStream("/relatorios/relatorio-gastos-clientes.jrxml")
        );

        Map<String, Object> params = new HashMap<>();
        params.put(JRParameter.REPORT_CONNECTION, connection);
        params.put("DataInicial", datas.getDataInicial());
        params.put("DataFinal", datas.getDataFinal());

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, connection);
        connection.close();
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

    private Connection getConnection() throws SQLException {
        String url = "jdbc:postgresql://localhost:5432/selfservice-choperia-db";
        String username = "postgres";
        String password = "123";
        return DriverManager.getConnection(url, username, password);
    }

    public byte[] gerarRelatorioFaltaEstoque() throws JRException, SQLException {
        Connection connection = getConnection();
        JasperReport jasperReport = JasperCompileManager.compileReport(
                getClass().getResourceAsStream("/relatorios/relatorio-falta-estoque.jrxml")
        );

        Map<String, Object> params = new HashMap<>();
        params.put(JRParameter.REPORT_CONNECTION, connection);

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, connection);
        connection.close();
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

    public byte[] gerarRelatorioChopesMaisVendidos(RelatorioDatasDTO datas) throws JRException, SQLException {
        Connection connection = getConnection();
        JasperReport jasperReport = JasperCompileManager.compileReport(
                getClass().getResourceAsStream("/relatorios/relatorio-chopes-mais-vendidos.jrxml")
        );

        Map<String, Object> params = new HashMap<>();
        params.put(JRParameter.REPORT_CONNECTION, connection);
        params.put("DataInicial", datas.getDataInicial());
        params.put("DataFinal", datas.getDataFinal());

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, connection);
        connection.close();
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

    public byte[] gerarRelatorioDespesas(RelatorioDatasDTO datas) throws JRException, SQLException {
        Connection connection = getConnection();
        JasperReport jasperReport = JasperCompileManager.compileReport(
                getClass().getResourceAsStream("/relatorios/relatorio-despesas.jrxml")
        );

        Map<String, Object> params = new HashMap<>();
        params.put(JRParameter.REPORT_CONNECTION, connection);
        params.put("DataInicial", datas.getDataInicial());
        params.put("DataFinal", datas.getDataFinal());

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, connection);
        connection.close();
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }
}
