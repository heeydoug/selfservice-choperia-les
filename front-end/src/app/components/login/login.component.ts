import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup = this.formBuilder.group({});
  usuario: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,

  ) {
  }

  ngOnInit(): void  {
    localStorage.removeItem("usuario");
    this.formulario = this.formBuilder.group({
      cpf: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  verificarUsuario() {
    if (!this.formulario.get('cpf')?.value || !this.formulario.get('senha')?.value ) {
      this.toastr.error('Preencha o CPF e/ou Senha!');
    }
    else{
      this.loginService.carregarUsuario(this.formulario.get('cpf')?.value).subscribe(
        data => this.entrou(data),
        error => this.toastr.error('Usuário não cadastrado!')
      );
    }
  }

  entrou(usuario: any) {
    localStorage.setItem("usuario", JSON.stringify(usuario));
    this.router.navigate(['/home']);
  }

}
