import {Component, OnInit} from '@angular/core';
import {Chope} from "../../models/chope";
import {ChopesService} from "../../services/chopes.service";
import {Router} from "@angular/router";
import {Servir} from "./models/servir";
import {ChopeSelecionado} from "./models/chopeSelecionado";
import {finalize, Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";

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
    private toast: ToastrService,

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


  focusCampoRfif() {
    document.getElementById('inputRfid')?.focus();
  }

  servirChope() {
    console.log(this.chopeSelecionado);
    this.service.servirChope(this.chopeSelecionado)
      .pipe(finalize(() => this.chopeSelecionado.cartao = undefined))
      .subscribe(() => {
        this.toast.success('Chope debitado com sucesso!', 'Servir Chope');
      },
        ex =>{
          if(ex.error.errors){
            ex.error.errors.forEach((element: { message: string | undefined; }) => {
              this.toast.error(element.message);
            });
          }
          else{
            this.toast.error(ex.error.message)
          }
        });
  }
}
