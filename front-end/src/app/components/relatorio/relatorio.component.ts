import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {RelatoriosService} from "../../services/relatorios.service";
import {NotificacaoUpdateComponent} from "../notificacao/notificacao-update/notificacao-update.component";
import {EnviarEmailComponent} from "./enviar-email/enviar-email.component";
import {Email} from "../../models/email";

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
}
