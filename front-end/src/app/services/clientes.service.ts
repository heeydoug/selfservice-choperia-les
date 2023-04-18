import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {first, Observable, tap} from "rxjs";
import {Produto} from "../models/produto";
import {Cliente} from "../models/cliente";
import {Tela} from "../models/tela";
import {query} from "@angular/animations";

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
  findAllWithCard(query?: { [key: string]: string }): Observable<Cliente[]> {
    const params = new HttpParams({ fromObject: query });
    return this.http.get<Cliente[]>(this.API, {params});
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
