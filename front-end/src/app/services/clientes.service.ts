import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {first, Observable, tap} from "rxjs";
import {Produto} from "../models/produto";
import {Cliente} from "../models/cliente";
import {Tela} from "../models/tela";
import {query} from "@angular/animations";
import {CartaoCliente} from "../models/cartaoCliente";

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly API = 'api/clientes';
  constructor(private http: HttpClient ) { }

  findByCpf(cpf: any): Observable<Cliente>{
    return this.http.get<Cliente>(this.API + '/' + cpf);
  }
  findByRfid(rfid: any): Observable<Cliente>{
    return this.http.get<Cliente>(this.API + '/' + rfid);
  }
  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API);
  }
  findClientesWithoutCard(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API + '/sem_cartao');
  }
  obterNomeClienteComCompraFinalizada(rfid: string): Observable<Cliente>{
    return this.http.get<Cliente>('api/cartao/cliente/nome/' + rfid);
  }

  findClientesWithCard(): Observable<CartaoCliente[]> {
    return this.http.get<CartaoCliente[]>(this.API + '/com_cartao');
  }
  findClienteByRfid(rfid: any): Observable<Cliente> {
    return this.http.get<Cliente>(this.API + '/rfid/' + rfid);
  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.API + '/cadastrar', cliente);
  }
  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.API}/${cliente.cpf}`, cliente);
  }
  delete(cpf: any): Observable<Cliente>{
    return this.http.delete<Cliente>(this.API + '/deletar/' + cpf);
  }
}
