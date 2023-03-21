import { Component } from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {FormControl, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ClientesService} from "../../../services/clientes.service";

@Component({
  selector: 'app-clientes-create',
  templateUrl: './clientes-create.component.html',
  styleUrls: ['./clientes-create.component.scss']
})
export class ClientesCreateComponent {
  cliente: Cliente = {
    cpf: '',
    nome: '',
    telefone: '',
    email: ''
  }
  nome: FormControl = new FormControl(null, [Validators.minLength(3), Validators.required]);
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.required);
  constructor(
    private service: ClientesService,
    private location: Location,
    private toast: ToastrService,
    private router: Router
  ) {
    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }
  }
  validaCampos(): boolean{
    return this.nome.valid &&
      this.cpf.valid &&
      this.nome.valid &&
      this.email.valid
  }

  create(): void {
    this.service.create(this.cliente).subscribe(() =>{
      this.toast.success('Cliente cadastrado com sucesso!', 'Cadastro de Cliente');
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
