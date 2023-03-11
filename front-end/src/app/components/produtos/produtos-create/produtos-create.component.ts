import { Component } from '@angular/core';
import {Location} from "@angular/common";
import {FormControl, Validators} from "@angular/forms";
import {ProdutosService} from "../../../services/produtos.service";
import {Produto} from "../../../models/produto";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-produtos-create',
  templateUrl: './produtos-create.component.html',
  styleUrls: ['./produtos-create.component.scss']
})
export class ProdutosCreateComponent {

  produto: Produto = {
    nome: '',
    codigoBarras: '',
    saldoEstoque: 0,
    precoCompra: 0,
    descricao: '',
    unidadeCompra: '',
    pontoCompra: 0
  }
  nome: FormControl = new FormControl(null, [Validators.minLength(3), Validators.required]);
  codigoBarras: FormControl = new FormControl(null, Validators.required);
  saldoEstoque: FormControl = new FormControl(null, Validators.required);
  precoCompra: FormControl = new FormControl(null, Validators.required);
  descricao: FormControl = new FormControl(null, Validators.required);
  unidadeCompra: FormControl = new FormControl(null, Validators.required);
  pontoCompra: FormControl = new FormControl(null, Validators.required);

  constructor(
    private service: ProdutosService,
    private location: Location,
    private toast: ToastrService
  ) {

  }

  validaCampos(): boolean{
    return this.nome.valid &&
      this.codigoBarras.valid &&
      this.saldoEstoque.valid &&
      this.precoCompra.valid &&
      this.descricao.valid &&
      this.unidadeCompra.valid &&
      this.pontoCompra.valid
  }
  create(): void {
    this.service.create(this.produto).subscribe(() =>{
      this.toast.success('Produto cadastrado com sucesso!', 'Cadastro de Produto');
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
