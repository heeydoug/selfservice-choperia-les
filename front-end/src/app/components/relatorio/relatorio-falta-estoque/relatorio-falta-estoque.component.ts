import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {RelatoriosService} from "../../../services/relatorios.service";
import {ToastrService} from "ngx-toastr";
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-relatorio-falta-estoque',
  templateUrl: './relatorio-falta-estoque.component.html',
  styleUrls: ['./relatorio-falta-estoque.component.scss']
})
export class RelatorioFaltaEstoqueComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<RelatorioFaltaEstoqueComponent>,
    private service: RelatoriosService,
    private toast: ToastrService,
    private dateAdapter: DateAdapter<Date>
  ) {

  }
  ngOnInit() {
    this.dateAdapter.setLocale('pt-BR');
  }

  cancelar() {
    this.dialogRef.close(true);
  }



  confirmar(){
    this.service.gerarRelatorioFaltaEstoque().subscribe({
      next: (response: any) => {
        this.cancelar();
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url);
        this.toast.success('Relatório gerado com sucesso!', 'Relatório de Falta de Estoque')
      },
      error: (error: any) => {
        console.log(error);
        this.toast.error('Erro ao gerar relatório!', 'Erro');
      }
    });
  }
}
