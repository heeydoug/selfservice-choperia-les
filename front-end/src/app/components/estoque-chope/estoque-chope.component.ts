import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Chope} from "../../models/chope";
import {MatTableDataSource} from "@angular/material/table";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {RfidService} from "../../services/rfid.service";
import {EstoqueChopeService} from "../../services/estoque-chope.service";
import {ChopesService} from "../../services/chopes.service";

@Component({
  selector: 'app-estoque-chope',
  templateUrl: './estoque-chope.component.html',
  styleUrls: ['./estoque-chope.component.scss']
})
export class EstoqueChopeComponent implements AfterViewInit{


  rfid: string = "";
  saldoEstoque: number = 1;
  chopes: Chope[] = [];
  ELEMENT_DATA: Chope[] = [];

  displayedColumns: string[] = ['rfid', 'nome', 'saldoEstoque'];
  dataSource = new MatTableDataSource<Chope>(this.chopes);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(
    private toast: ToastrService,
    private router: Router,
    public rfidService: RfidService,
    private estoqueChopeService: EstoqueChopeService,
    private serviceChope: ChopesService,

  ) {
    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

  inserir(){
    this.rfid = this.rfidService.rfid;
    if(this.rfid.length === 6){
      let chp: Chope | undefined = this.dataSource.data.find( chp =>
        chp?.rfid === this.rfid
      );

      if(chp === undefined){
        this.estoqueChopeService.carregarChope(this.rfid).subscribe(
          chope => {
            chope.saldoEstoque+=100;
            let array = this.dataSource.data;
            array.push(chope)
            this.dataSource.data = array;
          },
          error =>this.toast.error('Não foi possível adicionar o chope!')
        )
      }
      else{
        chp!.saldoEstoque+=100;
        this.dataSource.data = this.dataSource.data.map(c =>{
          if(c.rfid === chp!.rfid){
            return chp!;
          }
          return c;
        });
      }
      this.rfidService.rfid = "";
    }
  }


  finalizarEntradaEstoque() {
    this.estoqueChopeService.atualizarEstoque(this.dataSource.data).subscribe();
    this.toast.success('Entrada de chope realizada com sucesso!', 'Entrada Chope');
    this.router.navigate(['/home']);



  }
}
