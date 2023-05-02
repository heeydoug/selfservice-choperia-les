import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Chope} from "../models/chope";
import {Observable} from "rxjs";
import {CartaoCliente} from "../models/cartaoCliente";
import {CartaoClienteGastos} from "../models/cartaoClienteGastos";
import {Cliente} from "../models/cliente";

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
  obterGastosCartaoCLiente(rfid: string): Observable<CartaoClienteGastos[]>{
    return this.http.get<CartaoClienteGastos[]>(this.API + '/gastos/' + rfid);
  }
  obterTotalCartaoCliente(rfid: string){
    return this.http.get(this.API + '/total/' + rfid);
  }
  realizarVenda(metodoPagamento: string, rfid: string){
    return this.http.put(this.API + '/fechar/' + rfid, metodoPagamento);
  }


}
