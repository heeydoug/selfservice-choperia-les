import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {Produto} from "../../../models/produto";
import {FormControl, Validators} from "@angular/forms";
import {ClientesService} from "../../../services/clientes.service";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

interface ClienteEntrada extends Cliente {
  rfid?: any;
}
@Component({
  selector: 'app-entrada-clientes-editar',
  templateUrl: './entrada-clientes-editar.component.html',
  styleUrls: ['./entrada-clientes-editar.component.scss']
})
export class EntradaClientesEditarComponent implements OnInit{
  cliente: ClienteEntrada = {

    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    rfid: ''
  }
  rfid: FormControl = new FormControl(null, Validators.required);

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
    return this.rfid.valid
  }
  ngOnInit() {
    this.cliente.cpf = <string>this.route.snapshot.paramMap.get('cpf');
    this.findByCpf();
    this.focusInputCpf();
  }
  findByCpf(): void {
    this.service.findByCpf(this.cliente.cpf).subscribe(resposta => {
      this.cliente = resposta;
    });
  }
  focusInputCpf(): void{
    let blurElement: HTMLElement = document.getElementById("rfidInput") as HTMLElement;
    blurElement.blur();

    setTimeout(function(){
      let focusElement: HTMLElement = document.getElementById("rfidInput") as HTMLElement;
      focusElement.focus();
    },0);
  }

  update(): void {
    this.service.update(this.cliente).subscribe(() =>{
      this.toast.success('RFID adicionado com sucesso!', 'RFID');
      this.location.back();
    }, ex => {
      if(ex.error.errors){
        ex.error.errors.forEach((element: { message: string | undefined; }) => {
          this.toast.error(element.message);
        });
      } else{
        this.toast.error('Cartão RFID já cadastrado para outro Cliente!','Cartão RFID');
      }
    });
  }

  cancelar() {
    this.location.back();
  }
}
