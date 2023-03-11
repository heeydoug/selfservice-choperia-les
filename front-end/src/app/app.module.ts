import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { NavbarComponent } from './components/template/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './components/home/home.component';
import {MatCardModule} from "@angular/material/card";
import { UsuariosReadComponent } from './components/usuarios/usuarios-read/usuarios-read.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosFormComponent } from './components/usuarios/usuarios-form/usuarios-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from '@angular/material/select';
import { UsuariosFormEditComponent } from './components/usuarios/usuarios-form-edit/usuarios-form-edit.component';
import { UsuariosExcluirComponent } from './components/usuarios/usuarios-excluir/usuarios-excluir.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ProdutosListComponent } from './components/produtos/produtos-list/produtos-list.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {AuthInterceptorProvider} from "./interceptors/auth.interceptor";
import { ProdutosCreateComponent } from './components/produtos/produtos-create/produtos-create.component';
import {ToastrModule} from "ngx-toastr";
import { ProdutosUpdateComponent } from './components/produtos/produtos-update/produtos-update.component';
import { ProdutosDeleteComponent } from './components/produtos/produtos-delete/produtos-delete.component';









@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UsuariosReadComponent,
    UsuariosFormComponent,
    UsuariosFormEditComponent,
    UsuariosExcluirComponent,
    ProdutosListComponent,
    ProdutosCreateComponent,
    ProdutosUpdateComponent,
    ProdutosDeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    })

  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
