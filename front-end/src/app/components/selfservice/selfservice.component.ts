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
import {BalancaService} from "../../services/balanca.service";

@Component({
  selector: 'app-selfservice',
  templateUrl: './selfservice.component.html',
  styleUrls: ['./selfservice.component.scss']
})
export class SelfserviceComponent implements OnInit{

  formGroup: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clientesService: ClientesService,
    private selfserviceService: SelfserviceService,
    public balancaService: BalancaService,
    private toast: ToastrService,
  ) {
    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }

    this.formGroup = this.formBuilder.group({
      cartao: [null, Validators.required],
      nome: [{value: '', disabled: true}],
      preco: [{value: '', disabled: true}],
      peso: [null, Validators.required],
      valorTotal: [Validators.required]
    });
  }
  ngOnInit() {
    this.focusInputRfid();
    this.receberPrecoSelfService();
    this.receberPeso();
    setInterval(() => {
      this.selfserviceService.receberPesoBalanca().subscribe(response => {
        if(response){
          this.formGroup.patchValue({peso: response.lastWeight})
          let mult = 0;
          let preco = this.formGroup.get('preco')?.value;
          let peso = this.formGroup.get('peso')?.value;
          mult = peso * preco;
          this.formatarCasasDecimais(mult);
        }else{
          this.formGroup.setValue({peso: 0.0})
        }
      })
    }, 1000)
  }

  receberPrecoSelfService(){
    this.selfserviceService.receberPrecoSelfService()
      .pipe()
      .subscribe( (res) => {
        this.formGroup.controls['preco'].setValue(res);

      });
  }

  formatarCasasDecimais(mult: any) {
    const valor = parseFloat(mult);
    mult = valor.toFixed(2);
    this.formGroup.controls['valorTotal'].setValue(mult);
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
          this.receberPrecoSelfService();
          this.focusInputRfid();
        },
        error: (error) => {
          this.toast.error('Erro!', 'Erro');
        }
      });
  }

  abrirCriarNotificacao() {
    this.router.navigate(['selfservice/registrarNotificacao']);
  }

  abrirAlterarPrecoSelfService() {
    this.router.navigate(['selfservice/alterarPreco']);
  }

  multValorTotal(event: any): void {
    let mult = 0;
    let preco = this.formGroup.get('preco')?.value;
    let peso = this.formGroup.get('peso')?.value;
    mult = peso * preco;
    this.formGroup.controls['valorTotal'].setValue(mult);
  }

  receberPeso() {
    this.selfserviceService.receberPesoBalanca().subscribe(response => {
      if(response){
        this.formGroup.patchValue({peso: response.lastWeight})
        console.log(response + ' PESO')
      }else{
        this.formGroup.setValue({peso: 0.0})
      }
    })
  }

  iniciarBalanca() {
    this.balancaService.readerBalanca();

  }
}
