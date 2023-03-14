import { Component, OnInit } from '@angular/core';
import {Tela} from "../../../models/tela";
import {Location} from "@angular/common";
import {TelasService} from "../../../services/telas.service";
import {UsuariosService} from "../../../services/usuarios.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Usuario} from "../../../models/usuario";
import {ToastrService} from "ngx-toastr";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent implements OnInit{
  hide = true;

  usuario: Usuario = {
    cpf: '',
    nome: '',
    senha: '',
    telas: []
  }

  cpf: FormControl = new FormControl(null, Validators.required);
  nome: FormControl = new FormControl(null, [Validators.minLength(3), Validators.required]);
  senha: FormControl = new FormControl(null, Validators.required);
  telas: FormControl = new FormControl(null, Validators.required);

  telasArray: Tela[] = [];
  constructor(
    private location: Location,
    private telaService: TelasService,
    private usuarioService: UsuariosService,
    private snackBar: MatSnackBar,
    private toast: ToastrService,
    private router: Router

  ) {
    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }

  }
  validaCampos(): boolean{
    return this.cpf.valid &&
      this.nome.valid &&
      this.senha.valid &&
      this.telas.valid
  }

  ngOnInit(): void {
    this.telaService.list().subscribe(telas =>{
      this.telasArray = telas;
    });
  }

  cancelar(): void {
    this.location.back();
  }

  create(): void {
    this.usuarioService.create(this.usuario).subscribe(() =>{
      this.toast.success('Usuário cadastrado com sucesso!', 'Cadastro de Usuário');
      this.location.back();
    }, ex => {
      if(ex.error.errors){
        ex.error.errors.forEach((element: { message: string | undefined; }) => {
          this.toast.error(element.message);
        });
      } else{
        this.toast.error(ex.error.message)
      }
    });
  }

}
