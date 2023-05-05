import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificacaoService} from "../../../services/notificacao.service";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {SelfserviceService} from "../../../services/selfservice.service";

@Component({
  selector: 'app-alterar-preco-selfservice',
  templateUrl: './alterar-preco-selfservice.component.html',
  styleUrls: ['./alterar-preco-selfservice.component.scss']
})
export class AlterarPrecoSelfserviceComponent implements OnInit{

  precoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: SelfserviceService,
    private location: Location,
    private toast: ToastrService,
    private router: Router

  ) {
    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }
    this.precoForm = this.formBuilder.group({
      'preco': ['', [Validators.required]]
    });
  }
  ngOnInit() {
    this.receberPrecoSelfService();
  }

  receberPrecoSelfService(){
    this.service.receberPrecoSelfService()
      .subscribe( (res) => {
        this.precoForm.controls['preco'].setValue(res);
      });
  }

  alterarPreco() {
    this.service.alterarPreco(this.precoForm.value['preco'])
      .subscribe(() =>{
        this.toast.success('Preço do Self-Service alterado com sucesso!', 'Alterar Preço do Self-Service');
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
