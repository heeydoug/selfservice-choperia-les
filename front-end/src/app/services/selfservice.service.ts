import { Injectable } from '@angular/core';
import {Produto} from "../models/produto";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Cliente} from "../models/cliente";
import {SelfService} from "../models/selfservice";

@Injectable({
  providedIn: 'root'
})
export class SelfserviceService {

  private readonly API = 'api/self_service';
  constructor(private http: HttpClient) { }

  registrarPedido(self: SelfService): Observable<SelfService>{
    return this.http.post<SelfService>(this.API + '/cadastrar', self);
  }

}
