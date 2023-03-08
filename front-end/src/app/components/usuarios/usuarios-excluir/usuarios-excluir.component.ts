import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-usuarios-excluir',
  templateUrl: './usuarios-excluir.component.html',
  styleUrls: ['./usuarios-excluir.component.scss']
})
export class UsuariosExcluirComponent {
  constructor(
    public dialogRef: MatDialogRef<UsuariosExcluirComponent>
  ) {
  }

  cancelar() {
    this.dialogRef.close(true);

  }

}
