import {Component, OnInit} from '@angular/core';
import {Relatorio} from "../../../models/relatorio";
import {MatDialogRef} from "@angular/material/dialog";
import {RelatoriosService} from "../../../services/relatorios.service";
import {ToastrService} from "ngx-toastr";
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-relatorios-chopes-consumidos',
  templateUrl: './relatorios-chopes-consumidos.component.html',
  styleUrls: ['./relatorios-chopes-consumidos.component.scss']
})
export class RelatoriosChopesConsumidosComponent implements OnInit{
  chopesConsumidos: Relatorio;


  constructor(
    public dialogRef: MatDialogRef<RelatoriosChopesConsumidosComponent>,
    private service: RelatoriosService,
    private toast: ToastrService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.chopesConsumidos = {
      dataInicio: null,
      dataFinal: null
    };
  }
  ngOnInit() {
    this.dateAdapter.setLocale('pt-BR');
  }
  onDateInputInicio(event: any) {
    const selectedDate = event.value;
    this.chopesConsumidos.dataInicio = selectedDate.toISOString().substring(0, 10);
  }
  onDateInputFinal(event: any) {
    const selectedDate = event.value;
    this.chopesConsumidos.dataFinal = selectedDate.toISOString().substring(0, 10);
  }


  cancelar() {
    this.dialogRef.close(true);
  }

  isValid() {
    return !this.chopesConsumidos?.dataInicio || !this.chopesConsumidos?.dataFinal;
  }

  confirmar(){
    console.log(this.chopesConsumidos);
    if(this.chopesConsumidos.dataInicio && this.chopesConsumidos.dataFinal && this.chopesConsumidos.dataFinal < this.chopesConsumidos.dataInicio){
      this.toast.error('Data final não pode ser anterior à data de início!', 'Erro');
    }
    else{
      this.service.gerarRelatorioChopesConsumidos(this.chopesConsumidos).subscribe({
        next: (response: any) => {
          console.log(this.chopesConsumidos);
          this.cancelar();
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          window.open(url);
          this.toast.success('Relatório gerado com sucesso!', 'Relatório de Chopes Consumidos')
        },
        error: (error: any) => {
          console.log(error);
          this.toast.error('Erro ao gerar relatório!', 'Erro');
        }
      });
    }

  }
}
