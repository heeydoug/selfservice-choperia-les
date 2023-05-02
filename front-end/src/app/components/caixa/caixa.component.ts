import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientesService} from "../../services/clientes.service";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource} from "@angular/material/table";
import {CartaoClienteGastos} from "../../models/cartaoClienteGastos";
import {CartaoClienteService} from "../../services/cartao-cliente.service";
import {Cliente} from "../../models/cliente";
import {CartaoCliente} from "../../models/cartaoCliente";
import {MatPaginator} from "@angular/material/paginator";
import {Chope} from "../../models/chope";

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.scss']
})
export class CaixaComponent implements OnInit{
  form: FormGroup;

  cartaoCliente?: CartaoClienteGastos[] = [];
  displayedColumns: string[] = ['itens', 'data', 'valor'];
  dataSource = new MatTableDataSource<CartaoClienteGastos>(this.cartaoCliente)
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cartaoClienteService: CartaoClienteService,
    private toast: ToastrService
  ) {
    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }
    this.form = this.formBuilder.group({
      cartao: [null, Validators.required],
      nome: [{value: '', disabled: true}],
      valorTotal: [{value: '', disabled: true}],
      metodoPagamento: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.focusInputRfid();
  }

  preencherGastosCartaoCliente(rfid: string){
    this.cartaoClienteService.obterGastosCartaoCLiente(rfid)
      .subscribe(resposta =>{
      this.cartaoCliente = resposta
      this.dataSource = new MatTableDataSource<CartaoClienteGastos>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  focusInputRfid(): void{
    let blurElement: HTMLElement = document.getElementById("inputRfid") as HTMLElement;
    blurElement.blur();

    setTimeout(function(){
      let focusElement: HTMLElement = document.getElementById("inputRfid") as HTMLElement;
      focusElement.focus();
    },0);
  }

  finalizarVenda(): void {
    const rfid = this.form.get('cartao')?.value;
    const metodoPagamento = this.form.get('metodoPagamento')?.value;
    this.cartaoClienteService.realizarVenda(metodoPagamento, rfid)
      .pipe()
      .subscribe({
        next: () => {
          this.toast.success('Venda finalizada com sucesso!', 'Finalizar Venda')
          this.form.reset();
          this.dataSource.data = [];
        },
        error: () => this.toast.error('Erro ao finalizar venda!', 'Finalizar Venda')
      });
  }
  preencherCamposCliente(cartao: CartaoCliente): void{
    this.form.get('nome')?.setValue(cartao.cliente?.nome);
  }

  preencherTotalCartaoCliente(rfid: any): void{
    this.cartaoClienteService.obterTotalCartaoCliente(rfid)
      .pipe()
      .subscribe({
        next: (res) => {
          this.form.get('valorTotal')?.setValue(res);
        }
      })
  }

  findCardByRfid(event: any) {
    this.cartaoClienteService.acharCartaoAberto(event.target.value)
      .pipe()
      .subscribe({
        next: (res) => {
          this.preencherCamposCliente(res);
          this.preencherGastosCartaoCliente(event.target.value);
          this.preencherTotalCartaoCliente(event.target.value);

          this.toast.success('Informações inseridas com sucesso!')
        },
        error: () => {
          this.toast.error('Erro ao inserir informações!', 'Erro')
          this.cancelar();
        }
      });
  }

  cancelar() {
    this.form.reset();
  }
}
