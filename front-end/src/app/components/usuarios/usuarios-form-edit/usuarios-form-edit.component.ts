import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Tela} from "../../../models/tela";
import {Location} from "@angular/common";
import {TelasService} from "../../../services/telas.service";
import {UsuariosService} from "../../../services/usuarios.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Usuario} from "../../../models/usuario";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-usuarios-form-edit',
  templateUrl: './usuarios-form-edit.component.html',
  styleUrls: ['./usuarios-form-edit.component.scss']
})
export class UsuariosFormEditComponent implements OnInit {
  hide = true;

  // form = this.formBuilder.group({
  //   cpf: [''],
  //   nome: [''],
  //   senha: [''],
  //   telas: this.formBuilder.array(<Tela[]>[])
  // });

  usuario: Usuario = {
    cpf: '',
    nome: '',
    senha: '',
    telas: []
  }

  telas: Tela[] = [];
  form: any;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private usuarioService: UsuariosService,
    private telaService: TelasService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {

    const usuario: Usuario = this.route.snapshot.data['usuario'];
    console.log(usuario);

    // this.form.patchValue({
    //   cpf: usuario.cpf,
    //   nome: usuario.nome,
    //   senha: usuario.senha,
    //   telas: usuario.telas,
    //
    // });

    const cpf = this.route.snapshot.paramMap.get('cpf');
    console.log(cpf)
    if (cpf) {
      this.usuario.cpf = cpf;
      this.findByCpf();

      //Listar as telas que o usuário poderá ter acesso
      this.telaService.list().subscribe(telas => {
        this.telas = telas;
      });
    }
  }

  findByCpf(): void {
    this.usuarioService.findByCpf(this.usuario.cpf).subscribe(resposta => {
      this.usuario = resposta;
    });
  }

  cancelar(): void {
    this.location.back();
  }

  salvar() {
    //this.usuarioService.editar(this.form.value)
    //.subscribe(result => this.sucesso(), error => this.erro());
  }

  private sucesso() {
    this.snackBar.open("Alteração realizada com sucesso!", '', {duration: 5000});
    this.cancelar();
  }

  private erro() {
    this.snackBar.open("Erro ao alterar.", '', {duration: 5000});
  }
}
