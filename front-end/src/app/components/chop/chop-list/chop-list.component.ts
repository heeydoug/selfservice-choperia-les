import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {Cliente} from "../../../models/cliente";
import {ChopesService} from "../../../services/chopes.service";
import {MatPaginator} from "@angular/material/paginator";
import {Chope} from "../../../models/chope";

@Component({
  selector: 'app-chop-list',
  templateUrl: './chop-list.component.html',
  styleUrls: ['./chop-list.component.scss']
})
export class ChopListComponent implements OnInit{

  ELEMENT_DATA: Chope[] = [];
  displayedColumns: string[] = ['rfid', 'nome', 'precoCompra', 'saldoEstoque', 'precoCopo', 'acoes'];
  dataSource = new MatTableDataSource<Chope>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  constructor(
    private service: ChopesService,
    private router: Router,
  ) {
    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }
  }
  ngOnInit() {
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Chope>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create() {
    this.router.navigate(['chopes/cadastrar']);
  }

  update(chope: Chope) {
    this.router.navigate(['chopes/editar', chope.rfid]);

  }

  delete(chope: Chope) {
    this.router.navigate(['chopes/deletar', chope.rfid]);
  }

}
