package com.doug.backendSelfChop.service;

import com.doug.backendSelfChop.domain.Cliente;
import com.doug.backendSelfChop.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import javax.mail.*;
import javax.mail.internet.*;
import java.util.List;
import java.util.Properties;

@Service
@RequiredArgsConstructor
@Transactional
public class EmailService {

    @Autowired
    private final ClienteRepository clienteRepository;

    private final String nome = "Choperia Bola de Cristal";

    public Integer sendPromotion(String conteudo) throws MessagingException {
        return sendEmail(conteudo, "Promoção na ");
    }

    private Integer sendEmail(String conteudo,String assunto) throws MessagingException{
        List<Cliente> clientes = clienteRepository.findClientWithRecentAccount();
        Properties propriedades = new Properties();
        propriedades.put("mail.smtp.host", "smtp.gmail.com");
        propriedades.put("mail.smtp.port", "465");
        propriedades.put("mail.smtp.ssl.enable","true");
        propriedades.put("mail.smtp.auth", "true");
        //propriedades.put("mail.smtp.starttls.enable", "true");
        propriedades.put("mail.smtp.ssl.protocols","TLSv1.2");
        for (Cliente cliente : clientes){
            String email = cliente.getEmail();
            Session sessao = Session.getInstance(propriedades, new Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication("choperiaboladecristal@gmail.com", "pvdrrewjbqvgkido");
                }
            });

            Message mensagem = new MimeMessage(sessao);
            mensagem.setFrom(new InternetAddress("choperiaboladecristal@gmail.com"));
            mensagem.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
            mensagem.setSubject(assunto + nome);
            mensagem.setText(conteudo);
            Transport.send(mensagem);
        }
        return clientes.size();
    }
}
