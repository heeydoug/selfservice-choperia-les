import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Produto} from "../models/produto";
import {Observable} from "rxjs";
import {Chope} from "../models/chope";

@Injectable({
  providedIn: 'root'
})
export class EstoqueChopeService {

  private readonly API = 'api/estoques/chopes';
  constructor(private http: HttpClient) { }

  atualizarEstoque(chopes: Chope[]){
    return this.http.post<void>(this.API + '/atualizarEstoque', chopes);
  }
  carregarChope(rfid: string):Observable<Chope>{
    return this.http.get<Chope>(this.API + '/rfid/' + rfid);
  }
}
