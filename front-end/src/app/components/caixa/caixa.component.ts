import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource} from "@angular/material/table";
import {CartaoClienteGastos} from "../../models/cartaoClienteGastos";
import {CartaoClienteService} from "../../services/cartao-cliente.service";
import {CartaoCliente} from "../../models/cartaoCliente";
import {MatPaginator} from "@angular/material/paginator";

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
    private toast: ToastrService,
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
          this.imprimirComprovante();
          this.cancelar();
          this.toast.success('Venda finalizada com sucesso!', 'Finalizar Venda')

        },
        error: () => this.toast.error('Erro ao finalizar venda!', 'Finalizar Venda')
      });
  }

  //Funcionalidades de imprimir comprovante de pagamento
  imprimirComprovante(){
    const mywindow = window.open('', 'PRINT', 'height=600,width=600');

    mywindow?.document.write('<html><head><title>' + "Choperia e Self-Service Bola de Cristal" + '</title>');
    mywindow?.document.write('<head><body style="margin: 0; display: grid; font-family:Arial, Helvetica, sans-serif;"></div> </body></html>')

    const divPrincipal = this.criarDivPrincipal();

    divPrincipal.appendChild(this.criarCabecalhoComprovante());
    divPrincipal.appendChild(this.criarDivNomeCliente());
    divPrincipal.appendChild(this.criarTabelaItensConsumidos());
    divPrincipal.appendChild(this.criarDivValorTotal());
    divPrincipal.appendChild(this.criarDivMetodoPagamento());
    mywindow?.document.body.appendChild(divPrincipal);

    setTimeout(() => {
      mywindow?.document.close();
      mywindow?.focus();
      mywindow?.print();
      mywindow?.close();
    }, 200);

  }

  private criarDivPrincipal(): HTMLElement{
    let div = document.createElement('div');
    div.style.maxWidth = '8cm';
    return div;
  }

  private criarCabecalhoComprovante(): HTMLElement {
    let div = document.createElement('div');

    div.innerHTML = `
      <p style="text-align: right; font-weight: bold">${new Date().toLocaleDateString()} ${new Date().getHours().toLocaleString()}:${new Date().getMinutes().toLocaleString()}:${new Date().getSeconds().toLocaleString()}</p>
      <h3 style="text-align: center; font-family:Arial, Helvetica, sans-serif;">Choperia e Self-Service Bola de Cristal</h3>
      <hr>
    `;
    return div;
  }

   private criarDivValorTotal(): HTMLElement {
     let div = document.createElement('div');

     div.innerHTML = `
     <hr>
     <table style="width: 100%">
        <tr>
            <td colspan="3">Valor total:</td>
            <td style="text-align: right">${this.numeroParaReal(this.form.get('valorTotal')?.value)}</td>
        </tr>
     </table>
     `;
     return div;
   }

   criarTabelaItensConsumidos(): HTMLElement {
    const table = document.createElement('table');
    const head = document.createElement('thead');
    const linha = document.createElement('tr');
    const colunaItem = document.createElement('td');
    const colunaData = document.createElement('td');
    const colunaPreco = document.createElement('td');

    table.style.width = '100%';

    colunaItem.innerHTML = 'Nome';
    colunaData.innerHTML = 'Data e Hora';
    colunaData.style.textAlign = 'center';
    colunaPreco.innerHTML = 'Preço';
    colunaPreco.style.textAlign = 'right';

    linha.append(colunaItem, colunaData, colunaPreco);
    head.append(linha);
    table.append(head);
    table.appendChild(this.criarLinhasTabelaItensConsumidos());
    return table;
   }

   criarLinhasTabelaItensConsumidos(): HTMLElement{
    const tbody = document.createElement('tbody');
    this.cartaoCliente?.forEach(item => {
      const tr = document.createElement('tr')
      const colunaItem = document.createElement('td');
      const colunaData = document.createElement('td');
      const colunaPreco = document.createElement('td');

      colunaItem.innerHTML = <string>item.descricao;
      colunaData.innerHTML = String(item.data);
      colunaPreco.innerHTML = this.numeroParaReal(item.valor)

      tr.appendChild(colunaItem);
      tr.appendChild(colunaData);
      tr.appendChild(colunaPreco);

      tbody.appendChild(tr);
    });
    return tbody;
   }

   numeroParaReal(n: any){
    return n.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
   }

   criarDivMetodoPagamento(): HTMLElement {
     let div = document.createElement('div');

     div.innerHTML = `
     <table style="width: 100%">
         <tr>
            <td colspan="3">Método de pagamento:</td>
            <td style="text-align: right">${this.verificarMetodoPagamento(this.form.get('metodoPagamento')?.value)}</td>
        </tr>
     </table>
     <hr>
     `;
     return div;
   }
   private criarDivNomeCliente(): HTMLElement {
     let div = document.createElement('div');

     div.innerHTML = `
     <ht>
     <table style="width: 100%">
         <tr>
            <td colspan="3">Nome do cliente:</td>
            <td style="text-align: right">${this.form.get('nome')?.value}</td>
        </tr>
     </table>
     <hr>
     `;
     return div;
   }

   verificarMetodoPagamento(metodoPagamento: string){
    if(metodoPagamento == 'cartao'){
      return 'Cartão';
    }
    else if(metodoPagamento == 'pix'){
      return 'PIX';
    }
    else{
      return 'Dinheiro';
    }
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
    this.dataSource.data = [];
  }

}
