import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Tela} from "../../../models/tela";
import {Location} from "@angular/common";
import {TelasService} from "../../../services/telas.service";
import {UsuariosService} from "../../../services/usuarios.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Usuario} from "../../../models/usuario";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-usuarios-form-edit',
  templateUrl: './usuarios-form-edit.component.html',
  styleUrls: ['./usuarios-form-edit.component.scss']
})
export class UsuariosFormEditComponent implements OnInit {
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
    private usuarioService: UsuariosService,
    private telaService: TelasService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {
  }

  validaCampos(): boolean{
    return this.nome.valid &&
      this.senha.valid &&
      this.telas.valid
  }

  ngOnInit() {
    this.usuario.cpf = <string>this.route.snapshot.paramMap.get('cpf');
    this.findByCpf();

    //Listar as telas que o usuário poderá ter acesso
    this.telaService.list().subscribe(telas => {
      this.telasArray = telas;
    });
  }


  findByCpf(): void {
    this.usuarioService.findByCpf(this.usuario.cpf).subscribe(resposta => {
      this.usuario = resposta;
      console.log(this.usuario);
    });

  }

  update(): void {
    this.usuarioService.update(this.usuario).subscribe(() =>{
      this.toast.success('Usuário editado com sucesso!', 'Editar Usuário');
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

  cancelar(): void {
    this.location.back();
  }

}
