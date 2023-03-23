import {Component, Inject} from '@angular/core';
import {Produto} from "../../../models/produto";
import {ProdutosService} from "../../../services/produtos.service";
import {ToastrService} from "ngx-toastr";
import {Location} from "@angular/common";
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-produtos-delete',
  templateUrl: './produtos-delete.component.html',
  styleUrls: ['./produtos-delete.component.scss']
})
export class ProdutosDeleteComponent {
  produto: Produto = {
    nome: '',
    codigoBarras: '',
    saldoEstoque: 0,
    precoCompra: 0,
    descricao: '',
    unidadeCompra: '',
    pontoCompra: 0
  }

  constructor(
    private service: ProdutosService,
    private location: Location,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (localStorage.getItem('usuario') == null) {
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }
  }


  ngOnInit() {
    this.produto.codigoBarras = this.route.snapshot.paramMap.get('codigoBarras');
    this.findByCodBarras();
  }

  findByCodBarras(): void {
    this.service.findByCodBarras(this.produto.codigoBarras).subscribe(resposta => {
      this.produto = resposta;
    });
  }
  delete(): void {
    this.service.delete(this.produto.codigoBarras).subscribe(() =>{
      this.toast.success('Produto excluído com sucesso!', 'Excluir Produto');
      this.location.back();
    }, ex => {
      if(ex.error.errors){
        ex.error.errors.forEach((element: { message: string | undefined; }) => {
          this.toast.error(element.message);
        });
      } else{
        this.toast.error(ex.error.message)
      }
    });
  }

  cancelar() {
    this.location.back();
  }

}
