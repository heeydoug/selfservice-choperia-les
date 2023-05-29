import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Produto} from "../../models/produto";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {EstoqueEntradaService} from "../../services/estoque-entrada.service";
import {ChopesService} from "../../services/chopes.service";

@Component({
  selector: 'app-estoque-entrada',
  templateUrl: './estoque-entrada.component.html',
  styleUrls: ['./estoque-entrada.component.scss']
})
export class EstoqueEntradaComponent implements AfterViewInit{

  codigoBarras: string = "";
  saldoEstoque: number = 1;
  saldoEstoqueEntrada : number = 0;
  produtos: Produto[] = [];

  displayedColumns: string[] = ['codBarras', 'nome', 'saldoEstoque'];
  dataSource = new MatTableDataSource<Produto>(this.produtos);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(
    private toast: ToastrService,
    private router: Router,
    private entradaEstoqueService: EstoqueEntradaService,

  ) {

    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.focusInputCodBarras();
  }

  focusInputCodBarras(): void{
    let blurElement: HTMLElement = document.getElementById("codigoBarraInput") as HTMLElement;
    blurElement.blur();

    setTimeout(function(){
      let focusElement: HTMLElement = document.getElementById("codigoBarraInput") as HTMLElement;
      focusElement.focus();
    },0);
  }

  inserir(){
    if(this.codigoBarras.length === 13){
      let prod: Produto | undefined = this.dataSource.data.find( prod =>
        prod.codigoBarras === this.codigoBarras
      );

      if(prod === undefined){
        this.entradaEstoqueService.carregarProduto(this.codigoBarras).subscribe(
          produto => {
            produto.saldoEstoque++;
            let array = this.dataSource.data;
            array.push(produto)
            this.dataSource.data = array;
          },
          error =>this.toast.error('Não foi possível adicionar o produto!')
        )
      }
      else{
        prod!.saldoEstoque++;
        this.dataSource.data = this.dataSource.data.map(p =>{
          if(p.codigoBarras === prod!.codigoBarras){
            return prod!;
          }
          return p;
        });
      }
      this.codigoBarras = "";
    }
    this.codigoBarras = "";
  }

  finalizarEntradaEstoque() {
    this.entradaEstoqueService.atualizarEstoque(this.dataSource.data).subscribe();
    this.toast.success('Entrada estoque realizada com sucesso!', 'Entrada Estoque');
    this.router.navigate(['/home']);

  }
}
