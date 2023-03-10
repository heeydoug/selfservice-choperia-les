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
import { ProdutosExcluirComponent } from './components/produtos/produtos-excluir/produtos-excluir.component';
import { ProdutosFormComponent } from './components/produtos/produtos-form/produtos-form.component';
import { ProdutosFormEditComponent } from './components/produtos/produtos-form-edit/produtos-form-edit.component';
import { ProdutosReadComponent } from './components/produtos/produtos-read/produtos-read.component';









@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UsuariosReadComponent,
    UsuariosFormComponent,
    UsuariosFormEditComponent,
    UsuariosExcluirComponent,
    ProdutosExcluirComponent,
    ProdutosFormComponent,
    ProdutosFormEditComponent,
    ProdutosReadComponent
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
        MatSnackBarModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
