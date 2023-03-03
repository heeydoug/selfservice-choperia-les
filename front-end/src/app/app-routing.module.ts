import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {UsuariosReadComponent} from "./components/usuarios/usuarios-read/usuarios-read.component";

const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'usuarios',
    component: UsuariosReadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
