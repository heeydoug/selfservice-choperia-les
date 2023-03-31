import {AfterViewInit, Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Cliente} from "../../models/cliente";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Produto} from "../../models/produto";
import {ClientesService} from "../../services/clientes.service";

@Component({
  selector: 'app-entrada-clientes',
  templateUrl: './entrada-clientes.component.html',
  styleUrls: ['./entrada-clientes.component.scss']
})
export class EntradaClientesComponent implements AfterViewInit{

  cpf: string = "";
  displayedColumns: string[] = ['cpf', 'nome', 'cartaoRfid'];
  clientes: Cliente[] = [];
  dataSource = new MatTableDataSource<Cliente>(this.clientes);

  constructor(
    private toast: ToastrService,
    private router: Router,
    private clienteService: ClientesService
  ) {
    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit() {
    this.focusInputCpf();
  }
  focusInputCpf(): void{
    let blurElement: HTMLElement = document.getElementById("cpfInput") as HTMLElement;
    blurElement.blur();

    setTimeout(function(){
      let focusElement: HTMLElement = document.getElementById("cpfInput") as HTMLElement;
      focusElement.focus();
    },0);
  }
  procurarCliente() {
    if(this.cpf.length === 11){
      let cli: Cliente | undefined = this.dataSource.data.find( cli =>
        cli.cpf === this.cpf
      );

      if(cli === undefined){
        this.clienteService.findByCpf(this.cpf).subscribe(
          cliente => {
            let array = this.dataSource.data;
            array.push(cliente)
            this.dataSource.data = array;
          },
          error =>this.toast.error('Cliente não encontrado no sistema!')
        )
      }
      else{
        this.dataSource.data = this.dataSource.data.map(c =>{
          if(c.cpf === cli!.cpf){
            return cli!;
          }
          return c;
        });
      }
      this.cpf = "";
    }

  }

  update(cliente: Cliente) {
    this.router.navigate(['clientes/entrada', cliente.cpf]);
  }
}
