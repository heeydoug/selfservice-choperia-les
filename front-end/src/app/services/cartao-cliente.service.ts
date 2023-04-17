import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Chope} from "../models/chope";
import {Observable} from "rxjs";
import {CartaoCliente} from "../models/cartaoCliente";

@Injectable({
  providedIn: 'root'
})
export class CartaoClienteService{

  private readonly API = 'api/cartao/cliente';
  constructor(private http: HttpClient ) { }

  acharCartaoAberto(rfid: string): Observable<CartaoCliente>{
    return this.http.get<CartaoCliente>(this.API + '/rfid/' + rfid);
  }
  cadastrarCartao(vincularCartao: CartaoCliente): Observable<CartaoCliente>{
    return this.http.post<CartaoCliente>(this.API + '/cadastrar', vincularCartao);
  }

}
