import {Component, OnInit} from '@angular/core';
import {UsuariosService} from "../../../services/usuarios.service";
import {Observable} from "rxjs";
import {Usuario} from "../../../models/usuario";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {UsuariosExcluirComponent} from "../usuarios-excluir/usuarios-excluir.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-usuarios-read',
  templateUrl: './usuarios-read.component.html',
  styleUrls: ['./usuarios-read.component.scss']
})
export class UsuariosReadComponent implements OnInit {
  usuarios: Observable<Usuario[]>;
  displayedColumns: string[] = ['cpf', 'nome', 'telas','acoes'];

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.usuarios = this.usuariosService.list();
  }
  ngOnInit() {
  }

  adicionarUsuario() {
    this.router.navigate(['usuarios/novo']);

  }

  editar() {
    this.router.navigate(['usuarios/editar']);
  }

  excluir(row: Usuario): void {
    this.dialog.open(UsuariosExcluirComponent, {
      width: '400px',
      data: row
    });
  }

}
