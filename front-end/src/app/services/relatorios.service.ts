import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Notificacao} from "../models/notificacao";
import {HttpClient} from "@angular/common/http";
import {Email} from "../models/email";

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  constructor(private http: HttpClient) { }

  enviarEmail(mensagem: string): Observable<Email>{
    return this.http.post<Email>( 'api/email/promocao', mensagem);
  }
}
