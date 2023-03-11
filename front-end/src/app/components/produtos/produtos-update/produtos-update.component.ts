import {Component, OnInit} from '@angular/core';
import {Produto} from "../../../models/produto";
import {FormControl, Validators} from "@angular/forms";
import {ProdutosService} from "../../../services/produtos.service";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-produtos-update',
  templateUrl: './produtos-update.component.html',
  styleUrls: ['./produtos-update.component.scss']
})
export class ProdutosUpdateComponent implements OnInit{

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
    private toast: ToastrService,
    private route: ActivatedRoute
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

  ngOnInit() {
    this.produto.codigoBarras = this.route.snapshot.paramMap.get('codigoBarras');
    this.findByCodBarras();
  }

  findByCodBarras(): void {
    this.service.findByCodBarras(this.produto.codigoBarras).subscribe(resposta => {
      this.produto = resposta;
    });
  }
  update(): void {
    this.service.update(this.produto).subscribe(() =>{
      this.toast.success('Produto editado com sucesso!', 'Editar Produto');
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
