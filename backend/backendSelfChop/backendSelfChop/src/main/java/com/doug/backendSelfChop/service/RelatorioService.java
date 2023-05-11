package com.doug.backendSelfChop.service;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
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
        Connection connection = DriverManager.getConnection(
                "jdbc:postgresql://localhost:5432/selfservice-choperia-db",
                "postgres",
                "123"
        );

        JasperReport jasperReport = JasperCompileManager.compileReport(
                getClass().getResourceAsStream("/relatorios/relatorio-estoque.jrxml")
        );

        Map<String, Object> params = new HashMap<>();
        params.put(JRParameter.REPORT_CONNECTION, connection);

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, connection);

        return JasperExportManager.exportReportToPdf(jasperPrint);
    }
}
