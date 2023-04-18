import {Component, OnInit} from '@angular/core';
import {Chope} from "../../models/chope";
import {ChopesService} from "../../services/chopes.service";
import {Router} from "@angular/router";
import {Servir} from "./models/servir";
import {ChopeSelecionado} from "./models/chopeSelecionado";

@Component({
  selector: 'app-servir-chope',
  templateUrl: './servir-chope.component.html',
  styleUrls: ['./servir-chope.component.scss']
})
export class ServirChopeComponent implements OnInit{
  chopes: ChopeSelecionado[] = [];
  chopeSelecionado: Servir = new Servir();

  constructor(
    private service: ChopesService,
    private router: Router,
  ) {
    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.findAllChopes();
    this.focusCampoRfif();

  }
  findAllChopes(){
    this.chopeSelecionado = new Servir();
    this.service.findAll().subscribe(chopes =>{
      this.atualizaChopes(chopes)
    })
  }

  atualizaChopes(chopes: Chope[]): void{
    const chopeAux: ChopeSelecionado[] = [];
    chopes.forEach(chope =>{
      chopeAux.push(new ChopeSelecionado(chope));
      }
    );
    this.chopes = chopeAux;
    this.chopeSelecionado.chope = this.chopes[0].rfidChop;
  }

  get preco(): number {
    if(!!this.chopeSelecionado.chope){
      return this.chopes.filter(chope => chope.rfidChop === this.chopeSelecionado.chope)[0].precoCopo!;
    }
    return 0;
  }

  teste()  {
    console.log(this.chopeSelecionado.chope)
  }

  focusCampoRfif() {
    document.getElementById('inputRfid')?.focus();
  }

  servirChope() {

  }
}
