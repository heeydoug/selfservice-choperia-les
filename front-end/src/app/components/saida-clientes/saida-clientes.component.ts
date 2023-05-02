import {AfterViewInit, Component} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ClientesService} from "../../services/clientes.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Cliente} from "../../models/cliente";
import {CartaoClienteService} from "../../services/cartao-cliente.service";
import {CartaoCliente} from "../../models/cartaoCliente";

@Component({
  selector: 'app-saida-clientes',
  templateUrl: './saida-clientes.component.html',
  styleUrls: ['./saida-clientes.component.scss']
})
export class SaidaClientesComponent implements AfterViewInit{
  rfid: string = "";
  nome: string = "";

  constructor(
    private toast: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private clienteService: ClientesService,
    private cartaoClienteService: CartaoClienteService,
  ) {
    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit() {
    this.focusInputRfid();
  }

  focusInputRfid(): void{
    let blurElement: HTMLElement = document.getElementById("rfidInput") as HTMLElement;
    blurElement.blur();

    setTimeout(function(){
      let focusElement: HTMLElement = document.getElementById("rfidInput") as HTMLElement;
      focusElement.focus();
    },0);
  }
  preencherCamposCliente(cartao: Cliente): void{
    this.nome = cartao.nome;
  }

  findClienteByRfid(event: any): void {
    this.clienteService.obterNomeClienteComCompraFinalizada(event.target.value)
      .subscribe({
        next: (response) => {
          this.nome = response.nome;
        },
        error: () => {
          this.toast.error('Não existe nenhum cliente vinculado a este cartão ou a conta ainda não foi paga!', 'Saída de Clientes')
          this.cancelar();
        }
      });
  }

  cancelar() {
    this.rfid = '';
    this.nome = '';
  }

  finalizarSaidaCliente() {

  }
}
