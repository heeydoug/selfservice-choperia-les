import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {FormControl, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientesService} from "../../../services/clientes.service";

@Component({
  selector: 'app-clientes-update',
  templateUrl: './clientes-update.component.html',
  styleUrls: ['./clientes-update.component.scss']
})
export class ClientesUpdateComponent implements OnInit{
  cliente: Cliente = {

    nome: '',
    cpf: '',
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
    private route: ActivatedRoute,
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
  ngOnInit() {
    this.cliente.cpf = <string>this.route.snapshot.paramMap.get('cpf');
    this.findByCpf();
  }
  findByCpf(): void {
    this.service.findByCpf(this.cliente.cpf).subscribe(resposta => {
      this.cliente = resposta;
    });
  }

  update(): void {
    this.service.update(this.cliente).subscribe(() =>{
      this.toast.success('Cliente editado com sucesso!', 'Editar Cliente');
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
