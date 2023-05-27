import { Injectable } from '@angular/core';
import {Produto} from "../models/produto";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Cliente} from "../models/cliente";
import {SelfService} from "../models/selfservice";

@Injectable({
  providedIn: 'root'
})
export class SelfserviceService {

  private readonly API = 'api/self_service';
  constructor(private http: HttpClient) { }

  registrarPedido(self: SelfService): Observable<SelfService>{
    return this.http.post<SelfService>(this.API + '/cadastrar', self);
  }

  receberPrecoSelfService(){
    return this.http.get(this.API + '/preco');
  }

  receberPesoBalanca(): Observable<any>{
    return this.http.get("http://192.168.35.145/peso");
  }

  alterarPreco(preco: number){
    return this.http.put(this.API + '/preco/alterar', preco);
  }

}
