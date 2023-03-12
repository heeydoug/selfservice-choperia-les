import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Produto} from "../../../models/produto";
import {ProdutosService} from "../../../services/produtos.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.scss']
})
export class ProdutosListComponent implements OnInit{

  ELEMENT_DATA: Produto[] = [];
  displayedColumns: string[] = ['codBarras', 'nome', 'saldoEstoque', 'precoCompra', 'descricao', 'unidadeCompra', 'pontoCompra', 'acoes'];
  dataSource = new MatTableDataSource<Produto>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  constructor(
    private service: ProdutosService,
    private router: Router,


  ) {

  }
  ngOnInit() {
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Produto>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create() {
    this.router.navigate(['produtos/cadastrar']);
  }

  update(produto: Produto) {
    this.router.navigate(['produtos/editar', produto.codigoBarras]);

  }

  delete(produto: Produto) {
    this.router.navigate(['produtos/deletar', produto.codigoBarras]);
  }
}

