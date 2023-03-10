import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {UsuariosReadComponent} from "./components/usuarios/usuarios-read/usuarios-read.component";
import {UsuariosFormComponent} from "./components/usuarios/usuarios-form/usuarios-form.component";
import {UsuariosFormEditComponent} from "./components/usuarios/usuarios-form-edit/usuarios-form-edit.component";
import {ProdutosReadComponent} from "./components/produtos/produtos-read/produtos-read.component";
import {ProdutosFormComponent} from "./components/produtos/produtos-form/produtos-form.component";

const routes: Routes = [

  {
    path: '', component: HomeComponent
  },
  {
    path: 'usuarios', component: UsuariosReadComponent
  },
  {
    path: 'usuarios/cadastrar', component: UsuariosFormComponent
  },
  {
    path: 'usuarios/editar/:cpf', component: UsuariosFormEditComponent
  },
  {
    path: 'produtos', component: ProdutosReadComponent
  },
  {
    path: 'produtos/cadastrar', component: ProdutosFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
