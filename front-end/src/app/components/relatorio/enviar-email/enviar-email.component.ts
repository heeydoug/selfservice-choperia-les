import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {RelatoriosService} from "../../../services/relatorios.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-enviar-email',
  templateUrl: './enviar-email.component.html',
  styleUrls: ['./enviar-email.component.scss']
})
export class EnviarEmailComponent {

  email: string;

  constructor(
    public dialogRef: MatDialogRef<EnviarEmailComponent>,
    private service: RelatoriosService,
    private toast: ToastrService,

  ) {
    this.email = '';
  }

  cancelar() {
    this.dialogRef.close(true);
  }



  confirmar() {
    this.service.enviarEmail(this.email)
      .subscribe({
        next: () => {
          this.cancelar();
          this.dialogRef.afterClosed().subscribe(result => {
            this.toast.success('E-mails enviados com sucesso!', 'Enviar E-mail');
            console.log('Modal fechada com sucesso');
            this.email = '';
          });
        },
        error: () => {
          this.toast.error('Erro ao enviar e-mails!', 'Erro');
        }
      })
  }

  }


