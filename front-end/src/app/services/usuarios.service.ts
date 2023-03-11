import { Injectable } from '@angular/core';
import {Usuario} from "../models/usuario";
import {HttpClient} from "@angular/common/http";
import {first, Observable, tap} from "rxjs";
import {FormArray, ɵElement, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {Tela} from "../models/tela";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly API = 'api/usuarios';
  constructor(
    private httpClient: HttpClient
  ) { }

  list() {
    return this.httpClient.get<Usuario[]>(this.API)
      .pipe(
        first(),
        tap(usuarios => console.log(usuarios))
      )
  }

  save(record: Partial<Usuario>){
    return this.httpClient.post<Usuario>(this.API + "/cadastrar", record).pipe(first());
  }

  editar(record: Partial<Usuario>){
    return this.httpClient.put<Usuario>(`${this.API}/${record.cpf}`, record).pipe(first());
  }

  deletar(cpf: string){
    return this.httpClient.delete<string>(this.API + "/" + cpf);
  }
  findByCpf(cpf: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.API + "/editar/" + cpf );
  }


}
