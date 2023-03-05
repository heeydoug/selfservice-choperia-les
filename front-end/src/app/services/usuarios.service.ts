import { Injectable } from '@angular/core';
import {Usuario} from "../models/usuario";
import {HttpClient} from "@angular/common/http";
import {first, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly API = 'api/usuarios';
  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Usuario[]>(this.API)
      .pipe(
        first(),
        tap(usuarios => console.log(usuarios))
      )
  }

}
