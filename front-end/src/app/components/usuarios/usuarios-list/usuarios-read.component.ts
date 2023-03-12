import {Component, OnInit, ViewChild} from '@angular/core';
import {UsuariosService} from "../../../services/usuarios.service";
import {Observable} from "rxjs";
import {Usuario} from "../../../models/usuario";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {Produto} from "../../../models/produto";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-usuarios-read',
  templateUrl: './usuarios-read.component.html',
  styleUrls: ['./usuarios-read.component.scss']
})
export class UsuariosReadComponent implements OnInit {
  ELEMENT_DATA: Usuario[] = [];
  displayedColumns: string[] = ['cpf', 'nome', 'telas','acoes'];
  dataSource = new MatTableDataSource<Usuario>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(
    private service: UsuariosService,
    private router: Router,
  ) {
  }
  ngOnInit() {
    this.findAll();
  }
  findAll(){
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Usuario>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create() {
    this.router.navigate(['usuarios/cadastrar']);

  }

  update(usuario: Usuario) {
    this.router.navigate(['usuarios/editar',usuario.cpf]);
  }

  delete(usuario: Usuario): void {
    this.router.navigate(['usuarios/deletar', usuario.cpf]);
  }

}
