import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Tela} from "../../../models/tela";
import {Location} from "@angular/common";
import {TelasService} from "../../../services/telas.service";
import {UsuariosService} from "../../../services/usuarios.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent implements OnInit{
  form: FormGroup;
  hide = true;
  telas: Tela[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private telaService: TelasService,
    private usuarioService: UsuariosService,
    private snackBar: MatSnackBar,

  ) {
    this.form = this.formBuilder.group({
        cpf:[null],
        nome: [null],
        senha: [null],
        telas: [null]
    });
  }
  ngOnInit(): void {
    this.telaService.list().subscribe(telas =>{
      this.telas = telas;
    });
  }

  cancelar(): void {
    this.location.back();
  }

  salvar() {
    this.usuarioService.save(this.form.value)
      .subscribe(result => this.sucesso(), error => this.erro());
  }
  private sucesso(){
    this.snackBar.open("Cadastro realizado com sucesso!", '', {duration: 5000});
    this.cancelar();
  }
  private erro(){
    this.snackBar.open("Erro ao cadastrar.", '', {duration: 5000});
  }
}
