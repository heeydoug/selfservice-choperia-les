package com.doug.backendSelfChop.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URL;

public class MicroTerminalService {

    private int port = 1001;
    private Socket socket = null;
    private ServerSocket serverSocket = null;
    private BufferedInputStream bis = null;
    private DataInputStream dis = null;
    private String codigoCartaoCliente = "";
    private Boolean searchProduct = false;

    public MicroTerminalService() {
        try {
            serverSocket = new ServerSocket(port);
            System.out.println("Server started on port " + serverSocket.getLocalPort() + "...");
            System.out.println("Waiting for client...");

            socket = serverSocket.accept();
            System.out.println("Client " + socket.getRemoteSocketAddress() + " connected to server...");

            bis = new BufferedInputStream(socket.getInputStream());
            dis = new DataInputStream(bis);

            while (true) {
                try {
                    DataOutputStream dos = new DataOutputStream(socket.getOutputStream());
                    BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

                    var tecla = in.read() - 48;
                    processKey(tecla, dos);
                    if (!searchProduct) {
                        dos.writeUTF("Codigo do cartao: " + codigoCartaoCliente);
                    }

                    System.out.println(codigoCartaoCliente);
                } catch (IOException e) {
                    e.printStackTrace();
                    break;
                }
            }
            dis.close();
            socket.close();
            System.out.println("Client " + socket.getRemoteSocketAddress() + " disconnect from server...");
        } catch (IOException e) {
            System.out.println("Error : " + e);
        }
    }

    private void processKey(int key, DataOutputStream dos) throws IOException {
        dos.writeBytes("[H[2J");

        switch (key) {
            case -2:  // Tecla .
            case 40:  // Tecla X
                break;
            case -35:  // Tecla ENTER
                if (searchProduct) {
                    searchProduct = false;
                    codigoCartaoCliente = "";
                    break;
                }
                verificarContaCliente(codigoCartaoCliente, dos);
                break;
            case -40:  // Tecla BACKSPACE
                if (codigoCartaoCliente.length() == 0) {
                    break;
                }
                codigoCartaoCliente = codigoCartaoCliente.substring(0, codigoCartaoCliente.length() - 1);
                break;
            case -21:  // Tecla DELETE
                codigoCartaoCliente = "";
                break;
            default:
                if (codigoCartaoCliente.length() < 14) {
                    codigoCartaoCliente = codigoCartaoCliente.concat(String.valueOf(key));
                }
        }
    }

    private void verificarContaCliente(String codigoCartaoCliente, DataOutputStream dos) throws IOException {
        if(codigoCartaoCliente.isEmpty()) return;
        //conferir porta aplic
        var rotaContaCliente = new URL("http://localhost:8080/api/cartao/cliente/total/" + codigoCartaoCliente);
        //criar rota pra retornar o valor da conta
        //return double
        HttpURLConnection con = (HttpURLConnection) rotaContaCliente.openConnection();
        con.setRequestMethod("GET");
        con.setDoOutput(true);
        searchProduct = true;
        try {
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));

            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            con.disconnect();
            dos.flush();
            dos.writeUTF("Total da conta atualmente: R$ " + content.toString());
        } catch (Exception e) {
            dos.flush();
            dos.writeUTF("Erro ao buscar cliente!");
        }
    }

    public static void main(String args[]) {
       MicroTerminalService server = new MicroTerminalService();
    }
}