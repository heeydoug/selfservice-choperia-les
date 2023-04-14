import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Location, registerLocaleData} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Produto} from "../../../models/produto";
import {Notificacao} from "../../../models/notificacao";
import {NotificacaoService} from "../../../services/notificacao.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-notificacao-create',
  templateUrl: './notificacao-create.component.html',
  styleUrls: ['./notificacao-create.component.scss']
})
export class NotificacaoCreateComponent {

  @Output() create: EventEmitter<Notificacao> = new EventEmitter<Notificacao>();
  notificacaoForm: FormGroup;
  descricaoFormControl: FormControl = new FormControl(null, Validators.required);

  constructor(
    private formBuilder: FormBuilder,
    private service: NotificacaoService,
    private location: Location,
    private toast: ToastrService,
    private router: Router

  ) {
    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }
    this.notificacaoForm = this.formBuilder.group({
      'mensagem': ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  validaCampos() {
    return this.descricaoFormControl.valid
  }

  criarNotificacao() {
    this.service.create(this.notificacaoForm.value['mensagem'])
      .subscribe(()=>{
        this.toast.success('Notificação enviada com sucesso!', 'Registrar Itens Para Reposição');
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

    // this.service.create(this.notificacao.mensagem).subscribe(() =>{
    //   this.toast.success('Notificação enviada com sucesso!', 'Registrar Itens Para Reposição');
    //   this.location.back();
    // }, ex => {
    //   if(ex.error.errors){
    //     ex.error.errors.forEach((element: { message: string | undefined; }) => {
    //       this.toast.error(element.message);
    //     });
    //   } else{
    //     this.toast.error(ex.error.message)
    //   }
    // });

  }
  cancelar() {
    this.location.back();
  }
}
