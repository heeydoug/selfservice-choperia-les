import { Component } from '@angular/core';
import {Relatorio} from "../../../models/relatorio";
import {MatDialogRef} from "@angular/material/dialog";
import {RelatoriosService} from "../../../services/relatorios.service";
import {ToastrService} from "ngx-toastr";
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-relatorios-receitas-despesas',
  templateUrl: './relatorios-receitas-despesas.component.html',
  styleUrls: ['./relatorios-receitas-despesas.component.scss']
})
export class RelatoriosReceitasDespesasComponent {

  receitaDespesas: Relatorio;

  constructor(
    public dialogRef: MatDialogRef<RelatoriosReceitasDespesasComponent>,
    private service: RelatoriosService,
    private toast: ToastrService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.receitaDespesas = {
      dataInicio: null,
      dataFinal: null
    };
  }

  ngOnInit() {
    this.dateAdapter.setLocale('pt-BR');
  }

  cancelar() {
    this.dialogRef.close(true);
  }
  onDateInputInicio(event: any) {
    const selectedDate = event.value;
    this.receitaDespesas.dataInicio = selectedDate.toISOString().substring(0, 10);
  }
  onDateInputFinal(event: any) {
    const selectedDate = event.value;
    this.receitaDespesas.dataFinal = selectedDate.toISOString().substring(0, 10);
  }


  isValid() {
    return !this.receitaDespesas?.dataInicio || !this.receitaDespesas?.dataFinal;
  }

  confirmar() {
    console.log(this.receitaDespesas);
    if(this.receitaDespesas.dataInicio && this.receitaDespesas.dataFinal && this.receitaDespesas.dataFinal < this.receitaDespesas.dataInicio){
      this.toast.error('Data final não pode ser anterior à data de início!', 'Erro');
    }
    else{
      this.service.gerarRelatorioReceitasDespesas(this.receitaDespesas).subscribe({
        next: (response: any) => {
          console.log(this.receitaDespesas);
          this.cancelar();
          const blob = new Blob([response], {type: 'application/pdf'});
          const url = URL.createObjectURL(blob);
          window.open(url);
          this.toast.success('Relatório gerado com sucesso!', 'Relatório de Receitas x Despesas')
        },
        error: (error: any) => {
          console.log(error);
          this.toast.error('Erro ao gerar relatório!', 'Erro');
        }
      });
    }

  }
}
