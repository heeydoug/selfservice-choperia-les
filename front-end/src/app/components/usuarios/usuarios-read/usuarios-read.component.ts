import {Component, OnInit} from '@angular/core';
import {UsuariosService} from "../../../services/usuarios.service";
import {Observable} from "rxjs";
import {Usuario} from "../../../models/usuario";
import {ActivatedRoute, Router} from "@angular/router";

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
    private route: ActivatedRoute
  ) {
    this.usuarios = this.usuariosService.list();
  }
  ngOnInit() {
  }

  adicionarUsuario() {
    this.router.navigate(['usuarios/novo']);

  }
}
