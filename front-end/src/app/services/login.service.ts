import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../models/usuario";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = 'api/usuarios';

  constructor(
    private http: HttpClient
  ) { }

  carregarUsuario(cpf: String): Observable<Usuario>{
    return this.http.get<Usuario>(this.API + '/' + cpf);
  }
}
