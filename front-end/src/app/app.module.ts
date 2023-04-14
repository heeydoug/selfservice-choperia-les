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
import { UsuariosReadComponent } from './components/usuarios/usuarios-list/usuarios-read.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosFormComponent } from './components/usuarios/usuarios-create/usuarios-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from '@angular/material/select';
import { UsuariosFormEditComponent } from './components/usuarios/usuarios-update/usuarios-form-edit.component';
import { UsuariosExcluirComponent } from './components/usuarios/usuarios-delete/usuarios-excluir.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ProdutosListComponent } from './components/produtos/produtos-list/produtos-list.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {AuthInterceptorProvider} from "./interceptors/auth.interceptor";
import { ProdutosCreateComponent } from './components/produtos/produtos-create/produtos-create.component';
import {ToastrModule} from "ngx-toastr";
import { ProdutosUpdateComponent } from './components/produtos/produtos-update/produtos-update.component';
import { ProdutosDeleteComponent } from './components/produtos/produtos-delete/produtos-delete.component';
import { LoginComponent } from './components/login/login.component';
import { EstoqueEntradaComponent } from './components/estoque-entrada/estoque-entrada.component';
import { EstoqueSaidaComponent } from './components/estoque-saida/estoque-saida.component';
import { ClientesCreateComponent } from './components/clientes/clientes-create/clientes-create.component';
import { ClientesDeleteComponent } from './components/clientes/clientes-delete/clientes-delete.component';
import { ClientesListComponent } from './components/clientes/clientes-list/clientes-list.component';
import { ClientesUpdateComponent } from './components/clientes/clientes-update/clientes-update.component';
import { ChopDeleteComponent } from './components/chop/chop-delete/chop-delete.component';
import { ChopUpdateComponent } from './components/chop/chop-update/chop-update.component';
import { ChopListComponent } from './components/chop/chop-list/chop-list.component';
import { ChopCreateComponent } from './components/chop/chop-create/chop-create.component';
import { EstoqueChopeComponent } from './components/estoque-chope/estoque-chope.component';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { ImprimirCodbarrasComponent } from './components/produtos/imprimir-codbarras/imprimir-codbarras.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { EntradaClientesComponent } from './components/entrada-clientes/entrada-clientes.component';
import { EntradaClientesEditarComponent } from './components/entrada-clientes/entrada-clientes-editar/entrada-clientes-editar.component';
import { SaidaClientesComponent } from './components/saida-clientes/saida-clientes.component';
import { SelfserviceComponent } from './components/selfservice/selfservice.component';
import { NotificacaoCreateComponent } from './components/notificacao/notificacao-create/notificacao-create.component';
import { NotificacaoListComponent } from './components/cozinha/notificacao-list/notificacao-list.component';
import { NotificacaoUpdateComponent } from './components/notificacao/notificacao-update/notificacao-update.component';









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
    LoginComponent,
    EstoqueEntradaComponent,
    EstoqueSaidaComponent,
    ClientesCreateComponent,
    ClientesDeleteComponent,
    ClientesListComponent,
    ClientesUpdateComponent,
    ChopDeleteComponent,
    ChopUpdateComponent,
    ChopListComponent,
    ChopCreateComponent,
    EstoqueChopeComponent,
    ImprimirCodbarrasComponent,
    EntradaClientesComponent,
    EntradaClientesEditarComponent,
    SaidaClientesComponent,
    SelfserviceComponent,
    NotificacaoCreateComponent,
    NotificacaoListComponent,
    NotificacaoUpdateComponent,
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
        }),
        NgMultiSelectDropDownModule,
        MatCheckboxModule

    ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
