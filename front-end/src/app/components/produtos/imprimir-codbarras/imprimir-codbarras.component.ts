import {Component, OnInit, ViewChild} from '@angular/core';
import {Produto} from "../../../models/produto";
import {MatTableDataSource} from "@angular/material/table";
import {Location} from "@angular/common";
import {SelectionModel} from "@angular/cdk/collections";
import {ProdutosService} from "../../../services/produtos.service";
import {MatPaginator} from "@angular/material/paginator";
import * as jsBarcode from 'jsbarcode';
import { jsPDF } from 'jspdf';
import {ToastrService} from "ngx-toastr";

interface produtoImprimirCodBarras extends Produto {
  quantidade?: number;
}
@Component({
  selector: 'app-imprimir-codbarras',
  templateUrl: './imprimir-codbarras.component.html',
  styleUrls: ['./imprimir-codbarras.component.scss']
})
export class ImprimirCodbarrasComponent implements OnInit{

  ELEMENT_DATA: produtoImprimirCodBarras[] = [];
  displayedColumns: string[] = ['select','codBarras', 'nome', 'quantidade', 'acoes'];
  dataSource = new MatTableDataSource<produtoImprimirCodBarras>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  selection = new SelectionModel<produtoImprimirCodBarras>(true, []);

  produto: produtoImprimirCodBarras = {
    saldoEstoque: 0,
    quantidade: 0
  };

  constructor(
    private service: ProdutosService,
    private location: Location,
    private toast: ToastrService,

  ) {

  }

  ngOnInit() {
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe(resposta =>{
      let prod: produtoImprimirCodBarras[] = resposta
      prod = prod.map((prod)=>{
        prod.quantidade = 0
        return prod;
      })
      this.ELEMENT_DATA = prod
      this.dataSource = new MatTableDataSource<produtoImprimirCodBarras>(prod);
      this.dataSource.paginator = this.paginator;
    })
  }

  onProdutoSelecionado(produto: produtoImprimirCodBarras){
    this.selection.toggle(produto);

  }

  imprimir(): void {
    const canvas = document.createElement('canvas');
    const pdf = new jsPDF('l', 'mm', [115, 23]);
    const spacingBetweenTickets = 1.3;
    const barcodeSize = 36.6;
    let positionBuffer = spacingBetweenTickets;

    this.selection.selected.forEach((produto) => {
      if (!produto.codigoBarras) {
        return;
      }
      if (!produto.quantidade) {
        produto.quantidade = 1;
      }

      for (let i = 0; i < produto.quantidade; i++) {
        if (positionBuffer >= 110) {
          pdf.addPage();
          positionBuffer = spacingBetweenTickets;
        }

        jsBarcode(canvas, produto.codigoBarras!);
        pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', positionBuffer, 0, barcodeSize, 20.4);
        positionBuffer += barcodeSize + spacingBetweenTickets;
      }
    });

    pdf.autoPrint();
    pdf.output('dataurlnewwindow');
  }


  voltar() {
    this.location.back();
  }

  diminuir(event: any) {
    if(event.quantidade <= 0){
      this.toast.warning("Quantidade não pode ser negativa!" )
      event.quantidade += 0;
    }else{
      event.quantidade--;
    }


  }

  aumentar(event: any) {
    event.quantidade++;

  }
}
