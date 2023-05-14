import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Email} from "../models/email";
import {Relatorio} from "../models/relatorio";

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {
  private readonly API = 'api/relatorios';
  constructor(private http: HttpClient) { }

  enviarEmail(email: Email): Observable<Email>{
    return this.http.post<Email>( 'api/email/promocao', email);
  }

  gerarRelatorioEstoqueProdChope(): Observable<any>{
    return this.http.get(this.API + '/' + 'estoque', { responseType: 'arraybuffer' });
  }

  gerarRelatorioFaltaEstoque(){
    return this.http.get(`${this.API}/falta-estoque`, { responseType: 'arraybuffer' });
  }

  gerarRelatorioChopesConsumidos(relatorio: Relatorio){
    return this.http.get(`${this.API}/chopes-mais-vendidos?dataInicio=${relatorio.dataInicio}&dataFinal=${relatorio.dataFinal}`, { responseType: 'arraybuffer' });
  }

  gerarRelatorioGastosClientes(relatorio: Relatorio){
    return this.http.get(`${this.API}/gastos?dataInicio=${relatorio.dataInicio}&dataFinal=${relatorio.dataFinal}`, { responseType: 'arraybuffer' });
  }

  gerarRelatorioReceitasDespesas(relatorio: Relatorio){
    return this.http.get(`${this.API}/despesas?dataInicio=${relatorio.dataInicio}&dataFinal=${relatorio.dataFinal}`, { responseType: 'arraybuffer' });
  }



}
