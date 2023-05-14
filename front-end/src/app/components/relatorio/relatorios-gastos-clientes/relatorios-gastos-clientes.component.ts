import {Component, OnInit} from '@angular/core';
import {Relatorio} from "../../../models/relatorio";
import {MatDialogRef} from "@angular/material/dialog";
import {RelatoriosService} from "../../../services/relatorios.service";
import {ToastrService} from "ngx-toastr";
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-relatorios-gastos-clientes',
  templateUrl: './relatorios-gastos-clientes.component.html',
  styleUrls: ['./relatorios-gastos-clientes.component.scss']
})
export class RelatoriosGastosClientesComponent implements OnInit {
  gastosClientes: Relatorio;

  constructor(
    public dialogRef: MatDialogRef<RelatoriosGastosClientesComponent>,
    private service: RelatoriosService,
    private toast: ToastrService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.gastosClientes = {
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
    this.gastosClientes.dataInicio = selectedDate.toISOString().substring(0, 10);
  }
  onDateInputFinal(event: any) {
    const selectedDate = event.value;
    this.gastosClientes.dataFinal = selectedDate.toISOString().substring(0, 10);
  }


  isValid() {
    return !this.gastosClientes?.dataInicio || !this.gastosClientes?.dataFinal;
  }

  confirmar() {
    console.log(this.gastosClientes);
    this.service.gerarRelatorioGastosClientes(this.gastosClientes).subscribe({
      next: (response: any) => {
        console.log(this.gastosClientes);
        this.cancelar();
        const blob = new Blob([response], {type: 'application/pdf'});
        const url = URL.createObjectURL(blob);
        window.open(url);
        this.toast.success('Relatório gerado com sucesso!', 'Relatório de Gastos de Clientes')
      },
      error: (error: any) => {
        console.log(error);
        this.toast.error('Erro ao gerar relatório!', 'Erro');
      }
    });
  }
}
