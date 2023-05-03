import {Component, OnInit} from '@angular/core';
import {SelfService} from "../../models/selfservice";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ClientesService} from "../../services/clientes.service";
import {Cliente} from "../../models/cliente";
import {CartaoCliente} from "../../models/cartaoCliente";
import {finalize} from "rxjs";
import {SelfserviceService} from "../../services/selfservice.service";
import {tsCastToAny} from "@angular/compiler-cli/src/ngtsc/typecheck/src/ts_util";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-selfservice',
  templateUrl: './selfservice.component.html',
  styleUrls: ['./selfservice.component.scss']
})
export class SelfserviceComponent implements OnInit{

  formGroup: FormGroup;
  selfService: SelfService;
  clienteGastos?: CartaoCliente;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clientesService: ClientesService,
    private selfserviceService: SelfserviceService,
    private toast: ToastrService,
  ) {
    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }

    this.formGroup = this.formBuilder.group({
      cartao: [null, Validators.required],
      nome: [{value: '', disabled: true}],
      preco: [null, Validators.required],
      peso: [null, Validators.required],
      valorTotal: [{value: '', disabled: true}]
    });

    this.selfService = {
      cartao: '',
      nome: '',
      preco: 0,
      peso: 0,
    }
  }

  ngOnInit() {
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

  findClienteByRFID(event: any): void {
    this.clientesService.findClienteByRfid(event.target.value)
      .subscribe({
      next: (response) => {
        this.preencherCamposCliente(response);
      },
    });
  }

  preencherCamposCliente(cartao: Cliente): void{
    this.formGroup.get('nome')?.setValue(cartao.nome);
  }

  registrarPedido(): void {
    this.selfserviceService.registrarPedido(this.formGroup.value)
      .subscribe({
        next: () => {
          this.toast.success('Pedido registrado com sucesso!', 'Self-Service');
          this.formGroup.reset();
          this.formGroup.get('valorTotal')?.setValue('');
        },
        error: (error) => {
          this.toast.error('Erro!', 'Erro');
        }
      });
  }

  abrirCriarNotificacao() {
    this.router.navigate(['selfservice/registrarNotificacao']);
  }
}
