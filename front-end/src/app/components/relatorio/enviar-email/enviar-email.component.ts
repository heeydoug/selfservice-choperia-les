import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {RelatoriosService} from "../../../services/relatorios.service";
import {ToastrService} from "ngx-toastr";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {formatDate} from "@angular/common";
import {Email} from "../../../models/email";


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-enviar-email',
  templateUrl: './enviar-email.component.html',
  styleUrls: ['./enviar-email.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
})
export class EnviarEmailComponent implements OnInit{

  email: Email;

  constructor(
    public dialogRef: MatDialogRef<EnviarEmailComponent>,
    private service: RelatoriosService,
    private toast: ToastrService,
    private dateAdapter: DateAdapter<Date>

  ) {
    this.email = {
      conteudo: ''
    }
  }

  ngOnInit() {
    this.dateAdapter.setLocale('pt-BR');
  }

  resetForm() {
    this.email.conteudo = '';
  }



  cancelar() {
    this.dialogRef.close(true);
  }

  confirmar() {
    if(this.email.dataInicio && this.email.dataFim && this.email.dataFim < this.email.dataInicio){
      this.toast.error('Data final não pode ser anterior à data de início!', 'Erro');
    }
    else{
      this.service.enviarEmail(this.email)
        .subscribe({
          next: () => {
            this.cancelar();
            this.dialogRef.afterClosed().subscribe(result => {
              this.toast.success('E-mails enviados com sucesso!', 'Enviar E-mail');
              console.log('Modal fechada com sucesso');
              this.resetForm();
            });
          },
          error: () => {
            this.toast.error('Erro ao enviar e-mails!', 'Erro');
          }
        });
    }

  }

  isValid() {
    return !this.email?.dataInicio || !this.email?.dataFim;
  }
}


