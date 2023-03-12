import { Injectable } from '@angular/core';
import {Usuario} from "../models/usuario";
import {HttpClient} from "@angular/common/http";
import {first, Observable, tap} from "rxjs";
import {FormArray, ɵElement, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {Tela} from "../models/tela";
import {Produto} from "../models/produto";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly API = 'api/usuarios';
  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API);
  }

  findByCpf(cpf: any): Observable<Usuario>{
    return this.http.get<Usuario>(this.API + '/' + cpf);
  }

  create(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.API + '/cadastrar', usuario);
  }

  update(usuario: Usuario){
    return this.http.put<Usuario>(`${this.API}/${usuario.cpf}`, usuario);
  }

  delete(cpf: any): Observable<Usuario>{
    return this.http.delete<Usuario>(this.API + '/deletar/' + cpf);
  }

}
