import {Component, OnInit, ViewChild} from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ClientesService} from "../../../services/clientes.service";
import {CartaoClienteService} from "../../../services/cartao-cliente.service";
import {finalize} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {CartaoCliente} from "../../../models/cartaoCliente";

@Component({
  selector: 'app-entrada-clientes-cartao',
  templateUrl: './entrada-clientes-cartao.component.html',
  styleUrls: ['./entrada-clientes-cartao.component.scss']
})

export class EntradaClientesCartaoComponent implements OnInit{
  form: FormGroup;
  cliente: Cliente[] = [];
  ELEMENT_DATA: CartaoCliente[] = [];
  displayedColumns: string[] = ['cpf', 'nome', 'telefone', 'email', 'rfid'];
  dataSource = new MatTableDataSource<CartaoCliente>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private toast: ToastrService,
    private router: Router,
    private clienteService: ClientesService,
    private cartaoClienteService: CartaoClienteService
  ) {
    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }
    this.form = this.formBuilder.group({
      'cliente': ['', [Validators.required]],
      'rfid': ['', [Validators.required, Validators.min(10), Validators.min(10)]],
    });
  }
  ngOnInit(): void {
    this.procurarClientes();
    this.findAllClientesWithCard();
  }
  findAllClientesWithCard(){
    this.clienteService.findClientesWithCard().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<CartaoCliente>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  procurarClientes(): void {
    this.clienteService.findClientesWithoutCard().subscribe(clientes =>{
      this.cliente = clientes;

    });
  }

  vincularCartaoCliente() {
    if (!this.form.valid) {
      this.toast.warning('Verifique os dados inseridos!');
      return;
    }
    this.cartaoClienteService.cadastrarCartao(this.form.value)
      .pipe(finalize(() => {
        this.form.reset();
        this.procurarClientes();
        this.findAllClientesWithCard();
      }))
      .subscribe(() => {
        this.toast.success('Cartão RFID vinculado ao Cliente com sucesso!', 'Vincular Cartão RFID');
      }, ex => {
        if(ex.error.errors){
          ex.error.errors.forEach((element: { message: string | undefined; }) => {
            this.toast.error(element.message);
          });
        }
        else{
          this.toast.error('Cartão RFID já cadastrado para outro Cliente!','Vincular Cartão RFID');
        }
      });
  }





  }
