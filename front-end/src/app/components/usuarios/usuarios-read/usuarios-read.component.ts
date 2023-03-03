import { Component } from '@angular/core';

@Component({
  selector: 'app-usuarios-read',
  templateUrl: './usuarios-read.component.html',
  styleUrls: ['./usuarios-read.component.scss']
})
export class UsuariosReadComponent {

  constructor() {
  }

  displayedColumns: string[] = ['id', 'cpf', 'nome', 'telas','acoes'];
}
