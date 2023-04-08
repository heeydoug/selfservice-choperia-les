import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Produto} from "../models/produto";
import {Notificacao} from "../models/notificacao";
import {NotificacaoCreateComponent} from "../components/notificacao/notificacao-create/notificacao-create.component";

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  private readonly API = 'api/notificacoes';

  constructor(private http: HttpClient ) { }

  findById(id: any): Observable<Notificacao>{
    return this.http.get<Notificacao>(this.API + '/' + id);
  }
  findAll(): Observable<Notificacao[]> {
    return this.http.get<Notificacao[]>(this.API);
  }

  create(mensagem: string): Observable<Notificacao>{
    return this.http.post<Notificacao>(this.API + '/cadastrar', mensagem);
  }
  public update(id: string): Observable<void> {
    return this.http.patch<void>(`${this.API}/alterar_status/${ id }`, null);
  }

}
