import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Produto} from "../models/produto";

@Injectable({
  providedIn: 'root'
})
export class EstoqueEntradaService {

  private readonly API = 'api/estoques';
  constructor(private http: HttpClient) { }

  atualizarEstoque(produtos: Produto[]){
    return this.http.post<void>(this.API + '/atualizarEstoque', produtos);
  }
  carregarProduto(codBarras: string):Observable<Produto>{
    return this.http.get<Produto>(this.API + '/codigo_barras/' + codBarras);
  }
}
