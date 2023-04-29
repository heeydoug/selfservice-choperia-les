import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cliente} from "../models/cliente";
import {Chope} from "../models/chope";
import {Servir} from "../components/servir-chope/models/servir";

@Injectable({
  providedIn: 'root'
})
export class ChopesService {

  private readonly API = 'api/chopes';
  constructor(private http: HttpClient ) { }

  findByRfid(rfid: any): Observable<Chope>{
    return this.http.get<Chope>(this.API + '/' + rfid);
  }
  findAll(): Observable<Chope[]> {
    return this.http.get<Chope[]>(this.API);
  }
  create(chope: Chope): Observable<Chope>{
    return this.http.post<Chope>(this.API + '/cadastrar', chope);
  }
  update(chope: Chope): Observable<Chope>{
    return this.http.put<Chope>(`${this.API}/${chope.rfid}`, chope);
  }
  delete(rfid: any): Observable<Chope>{
    return this.http.delete<Chope>(this.API + '/deletar/' + rfid);
  }
  public servirChope(servir: Servir): Observable<void> {
    return this.http.post<void>(this.API + '/servir',servir);
  }
}
