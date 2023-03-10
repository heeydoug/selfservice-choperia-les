import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Usuario} from "../../../models/usuario";
import {first} from "rxjs";
import {UsuariosService} from "../../../services/usuarios.service";

@Component({
  selector: 'app-usuarios-excluir',
  templateUrl: './usuarios-excluir.component.html',
  styleUrls: ['./usuarios-excluir.component.scss']
})
export class UsuariosExcluirComponent {
  public usuario: Usuario;

  constructor(
    public dialogRef: MatDialogRef<UsuariosExcluirComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private service: UsuariosService,
  ) {
    this.usuario = data
  }


  excluir() {
    this.service.deletar(this.usuario.cpf).pipe(first()).subscribe()
    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close(true);

  }
}
