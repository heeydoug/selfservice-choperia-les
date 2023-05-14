import {Component, OnInit} from '@angular/core';
import {RelatorioEstoqueProdChope} from "../../../models/relatorioEstoqueProdChope";
import {MatDialogRef} from "@angular/material/dialog";
import {RelatoriosService} from "../../../services/relatorios.service";
import {ToastrService} from "ngx-toastr";
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-relatorio-estoque-prod-chope',
  templateUrl: './relatorio-estoque-prod-chope.component.html',
  styleUrls: ['./relatorio-estoque-prod-chope.component.scss']
})
export class RelatorioEstoqueProdChopeComponent implements OnInit{

  estoqueProdChope: RelatorioEstoqueProdChope;

  constructor(
    public dialogRef: MatDialogRef<RelatorioEstoqueProdChopeComponent>,
    private service: RelatoriosService,
    private toast: ToastrService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.estoqueProdChope = {
      dataInicio: new Date(),
      dataFim: new Date()
    };
  }
  ngOnInit() {
    this.dateAdapter.setLocale('pt-BR');
  }

  confirmar(){
    this.service.gerarRelatorioEstoqueProdChope().subscribe({
      next: (response: any) => {
        this.cancelar();
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url);
        this.toast.success('Relatório gerado com sucesso!', 'Relatório Estoque (Produtos e Chopes)')
      },
      error: (error: any) => {
        console.log(error);
        this.toast.error('Erro ao gerar relatório!', 'Erro');
      }
    });
  }

  cancelar() {
    this.dialogRef.close(true);
  }

  isValid() {
    return !this.estoqueProdChope?.dataInicio || !this.estoqueProdChope?.dataFim;
  }

}
