import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Tela} from "../../../models/tela";
import {Location} from "@angular/common";

@Component({
  selector: 'app-usuarios-form-edit',
  templateUrl: './usuarios-form-edit.component.html',
  styleUrls: ['./usuarios-form-edit.component.scss']
})
export class UsuariosFormEditComponent {
  form: FormGroup;
  hide = true;
  telas: Tela[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      cpf:[null],
      nome: [null],
      senha: [null],
      telas: [null]
    });
  }
  cancelar(): void {
    this.location.back();
  }

  ngOnInit(): void {
  }
}
