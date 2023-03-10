import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-produtos-read',
  templateUrl: './produtos-read.component.html',
  styleUrls: ['./produtos-read.component.scss']
})
export class ProdutosReadComponent {
  produtos: any;
  displayedColumns: any;

  constructor(
    private router: Router,
  ) {
  }
  adicionarProduto() {
    this.router.navigate(['produtos/cadastrar']);

  }

  excluir() {

  }

  editar() {

  }
}
