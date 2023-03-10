import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tela} from "../models/tela";
import {first, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TelasService {

  private readonly API = 'api/telas';
  constructor(
    private httpClient: HttpClient

  ) {

  }
  list() {
    return this.httpClient.get<Tela[]>(this.API)
      .pipe(
        first(),
        tap(telas => console.log(telas))
      );
  }
}
