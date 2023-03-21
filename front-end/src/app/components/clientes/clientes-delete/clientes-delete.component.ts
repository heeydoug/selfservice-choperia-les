import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {ClientesService} from "../../../services/clientes.service";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-clientes-delete',
  templateUrl: './clientes-delete.component.html',
  styleUrls: ['./clientes-delete.component.scss']
})
export class ClientesDeleteComponent implements OnInit{
  cliente: Cliente = {
    cpf: '',
    nome: '',
    telefone: '',
    email: ''
  }
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

  ngOnInit() {
    this.cliente.cpf = <string>this.route.snapshot.paramMap.get('cpf');
    this.findByCpf();
  }
  findByCpf(): void {
    this.service.findByCpf(this.cliente.cpf).subscribe(resposta => {
      this.cliente = resposta;
    });
  }

  delete(): void {
    this.service.delete(this.cliente.cpf).subscribe(() =>{
      this.toast.success('Cliente excluído com sucesso!', 'Excluir Cliente');
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
