import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Usuario} from "../../../models/usuario";
import {first, Observable} from "rxjs";
import {UsuariosService} from "../../../services/usuarios.service";
import {ToastrService} from "ngx-toastr";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {TelasService} from "../../../services/telas.service";
import {Tela} from "../../../models/tela";

@Component({
  selector: 'app-usuarios-excluir',
  templateUrl: './usuarios-excluir.component.html',
  styleUrls: ['./usuarios-excluir.component.scss']
})
export class UsuariosExcluirComponent implements OnInit{
  hide = true;

  usuario: Usuario = {
    cpf: '',
    nome: '',
    senha: '',
    telas: []
  }

  telasArray: Tela[] = [];
  constructor(

    private usuarioService: UsuariosService,
    private telaService: TelasService,
    private toast: ToastrService,
    private location: Location,
    private route: ActivatedRoute
  ) {

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
    });
  }
  delete(): void {
    this.usuarioService.delete(this.usuario.cpf).subscribe(() =>{
      this.toast.success('Usuário excluído com sucesso!', 'Excluir Usuário');
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

  cancelar() {
    this.location.back();

  }
}
