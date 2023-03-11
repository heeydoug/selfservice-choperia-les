import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {UsuariosReadComponent} from "./components/usuarios/usuarios-read/usuarios-read.component";
import {UsuariosFormComponent} from "./components/usuarios/usuarios-form/usuarios-form.component";
import {UsuariosFormEditComponent} from "./components/usuarios/usuarios-form-edit/usuarios-form-edit.component";
import {ProdutosListComponent} from "./components/produtos/produtos-list/produtos-list.component";
import {ProdutosCreateComponent} from "./components/produtos/produtos-create/produtos-create.component";
import {ProdutosUpdateComponent} from "./components/produtos/produtos-update/produtos-update.component";
import {ProdutosDeleteComponent} from "./components/produtos/produtos-delete/produtos-delete.component";

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
    path: 'produtos', component: ProdutosListComponent
  },
  {
    path: 'produtos/cadastrar', component: ProdutosCreateComponent
  },
  {
    path: 'produtos/editar/:codigoBarras', component: ProdutosUpdateComponent
  },
  {
    path: 'produtos/deletar/:codigoBarras', component: ProdutosDeleteComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
