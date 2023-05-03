import {AfterViewInit, Component} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ClientesService} from "../../services/clientes.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cliente} from "../../models/cliente";
import {CartaoClienteService} from "../../services/cartao-cliente.service";
import {CartaoCliente} from "../../models/cartaoCliente";

@Component({
  selector: 'app-saida-clientes',
  templateUrl: './saida-clientes.component.html',
  styleUrls: ['./saida-clientes.component.scss']
})
export class SaidaClientesComponent implements AfterViewInit{
  form: FormGroup;
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
    this.form = this.formBuilder.group({
      rfid: [null, Validators.required],
      nome: [{value: '', disabled: true}],
    });
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

  // findClienteByRfid(event: any): void {
  //   this.clienteService.obterNomeClienteComCompraFinalizada(event.target.value)
  //     .pipe()
  //     .subscribe({
  //       next: (response) => {
  //         this.nome = response.nome;
  //       },
  //       error: () => {
  //         this.toast.error('Não existe nenhum cliente vinculado a este cartão ou a conta ainda não foi paga!', 'Saída de Clientes')
  //         this.cancelar();
  //       }
  //     });
  // }
  findClienteByRfid(event: any): void {
    this.clienteService.obterNomeClienteComCompraFinalizada(event.target.value)
      .pipe()
      .subscribe({
        next: (response) => {
          console.log(response)
          this.form.get('nome')?.setValue(response.nome);
        },
        error: () => {
          this.toast.error('Não existe nenhum cliente vinculado a este cartão ou a conta ainda não foi paga!', 'Saída de Clientes')
          this.cancelar();
        }
      });
  }

  cancelar() {
    this.form.get('rfid')?.setValue('');
    this.form.get('nome')?.setValue('');
  }

  finalizarSaidaCliente() {
    this.clienteService.desvincularCartao(this.form.get('rfid')?.value)
      .pipe()
      .subscribe({
        next: (response) => {
          this.toast.success('Cartão desvinculado com sucesso!','Finalizar Saída')
          this.cancelar();
        },
        error: () => {
          this.toast.error('Não existe nenhum cliente vinculado a este cartão ou a conta ainda não foi paga!', 'Saída de Clientes')
          this.cancelar();
        }
      })
  }

  formValid() {
    if(this.form.get('rfid')?.value){
      return false
    }
    else{
      return true
    }
  }
}
