import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {UsuariosReadComponent} from "./components/usuarios/usuarios-list/usuarios-read.component";
import {UsuariosFormComponent} from "./components/usuarios/usuarios-create/usuarios-form.component";
import {UsuariosFormEditComponent} from "./components/usuarios/usuarios-update/usuarios-form-edit.component";
import {ProdutosListComponent} from "./components/produtos/produtos-list/produtos-list.component";
import {ProdutosCreateComponent} from "./components/produtos/produtos-create/produtos-create.component";
import {ProdutosUpdateComponent} from "./components/produtos/produtos-update/produtos-update.component";
import {ProdutosDeleteComponent} from "./components/produtos/produtos-delete/produtos-delete.component";
import {UsuariosExcluirComponent} from "./components/usuarios/usuarios-delete/usuarios-excluir.component";
import {LoginComponent} from "./components/login/login.component";
import {EstoqueEntradaComponent} from "./components/estoque-entrada/estoque-entrada.component";
import {EstoqueSaidaComponent} from "./components/estoque-saida/estoque-saida.component";
import {ClientesListComponent} from "./components/clientes/clientes-list/clientes-list.component";
import {ClientesCreateComponent} from "./components/clientes/clientes-create/clientes-create.component";
import {ClientesUpdateComponent} from "./components/clientes/clientes-update/clientes-update.component";
import {ClientesDeleteComponent} from "./components/clientes/clientes-delete/clientes-delete.component";
import {ChopListComponent} from "./components/chop/chop-list/chop-list.component";
import {ChopCreateComponent} from "./components/chop/chop-create/chop-create.component";
import {ChopUpdateComponent} from "./components/chop/chop-update/chop-update.component";
import {ChopDeleteComponent} from "./components/chop/chop-delete/chop-delete.component";
import {EstoqueChopeComponent} from "./components/estoque-chope/estoque-chope.component";

const routes: Routes = [

  {
    path: 'home', component: HomeComponent
  },

  { path: '', redirectTo: 'login', pathMatch: 'full'},

  {
    path: 'login', component: LoginComponent
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
    path: 'usuarios/deletar/:cpf', component: UsuariosExcluirComponent
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
  },

  {
    path: 'estoque/entrada', component: EstoqueEntradaComponent
  },
  {
    path: 'estoque/saida', component: EstoqueSaidaComponent
  },

  {
    path: 'clientes', component: ClientesListComponent
  },
  {
    path: 'clientes/cadastrar', component: ClientesCreateComponent
  },
  {
    path: 'clientes/editar/:cpf', component: ClientesUpdateComponent
  },
  {
    path: 'clientes/deletar/:cpf', component: ClientesDeleteComponent
  },


  {
    path: 'chopes', component: ChopListComponent
  },
  {
    path: 'chopes/cadastrar', component: ChopCreateComponent
  },
  {
    path: 'chopes/editar/:rfid', component: ChopUpdateComponent
  },
  {
    path: 'chopes/deletar/:rfid', component: ChopDeleteComponent
  },

  {
    path: 'estoque/chopes', component: EstoqueChopeComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
