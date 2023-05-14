import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {RelatoriosService} from "../../services/relatorios.service";
import {NotificacaoUpdateComponent} from "../notificacao/notificacao-update/notificacao-update.component";
import {EnviarEmailComponent} from "./enviar-email/enviar-email.component";
import {Email} from "../../models/email";
import {
  RelatorioEstoqueProdChopeComponent
} from "./relatorio-estoque-prod-chope/relatorio-estoque-prod-chope.component";
import {RelatorioFaltaEstoqueComponent} from "./relatorio-falta-estoque/relatorio-falta-estoque.component";
import {
  RelatoriosChopesConsumidosComponent
} from "./relatorios-chopes-consumidos/relatorios-chopes-consumidos.component";
import {RelatoriosGastosClientesComponent} from "./relatorios-gastos-clientes/relatorios-gastos-clientes.component";
import {
  RelatoriosReceitasDespesasComponent
} from "./relatorios-receitas-despesas/relatorios-receitas-despesas.component";

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private service: RelatoriosService

  ) {
    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }
  }

  abrirModalEnviarEmail() {
    this.dialog.open(EnviarEmailComponent, {
      width: '1000px',
    });
  }

  abrirModalRelatorioEstoqueProduto(){
    this.dialog.open(RelatorioEstoqueProdChopeComponent, {
      width: '600px',
    });
  }
  abrirModalRelatorioFaltaEstoque(){
    this.dialog.open(RelatorioFaltaEstoqueComponent, {
      width: '600px',
    });
  }
  abrirModalRelatorioChopesConsumidos(){
    this.dialog.open(RelatoriosChopesConsumidosComponent, {
      width: '600px',
    });
  }
  abrirModalRelatorioGastosClientes(){
    this.dialog.open(RelatoriosGastosClientesComponent, {
      width: '600px',
    });
  }
  abrirModalRelatorioReceitasDespesas(){
    this.dialog.open(RelatoriosReceitasDespesasComponent, {
      width: '600px',
    });
  }

}
