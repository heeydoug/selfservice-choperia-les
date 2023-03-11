import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Produto} from "../models/produto";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private readonly API = 'api/produtos';
  constructor(private http: HttpClient ) { }

  findByCodBarras(codBarras: any): Observable<Produto>{
    return this.http.get<Produto>(this.API + '/' + codBarras);
  }
  findAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API);
  }
  create(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>(this.API + '/cadastrar', produto);
  }
  update(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>(`${this.API}/${produto.codigoBarras}`, produto);
  }
  delete(codBarras: any): Observable<Produto>{
    return this.http.delete<Produto>(this.API + '/deletar/' + codBarras);
  }
}
