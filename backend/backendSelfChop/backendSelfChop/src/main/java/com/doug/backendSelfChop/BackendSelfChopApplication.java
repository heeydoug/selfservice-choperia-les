package com.doug.backendSelfChop;

import com.doug.backendSelfChop.service.IniciarAplicacaoService;
import com.doug.backendSelfChop.service.MicroTerminalService;
import com.doug.backendSelfChop.service.SelfServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendSelfChopApplication implements CommandLineRunner {

	@Autowired
	private IniciarAplicacaoService iniciarAplicacaoService;


	public static void main(String[] args) {
		SpringApplication.run(BackendSelfChopApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		iniciarAplicacaoService.IniciarAplicacao();
		MicroTerminalService.main(args);
	}
}
