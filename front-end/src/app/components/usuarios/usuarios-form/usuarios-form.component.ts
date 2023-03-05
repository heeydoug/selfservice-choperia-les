import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Tela} from "../../../models/tela";

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent implements OnInit{
  form: FormGroup;
  hide = true;
  telas: Tela[] = [];
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
        cpf:[null],
        nome: [null],
        senha: [null],
        telas: [null]
    });
  }
  ngOnInit(): void {
  }

}
