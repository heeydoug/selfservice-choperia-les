import { Component } from '@angular/core';
import {Chope} from "../../../models/chope";
import {FormControl, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ChopesService} from "../../../services/chopes.service";
import {RfidService} from "../../../services/rfid.service";

@Component({
  selector: 'app-chop-create',
  templateUrl: './chop-create.component.html',
  styleUrls: ['./chop-create.component.scss']
})
export class ChopCreateComponent {
  chope: Chope = {
    nome: '',
    rfid: '',
    saldoEstoque: 100,
    precoCompra: 0,
    precoCopo: 0,
  }

  nome: FormControl = new FormControl(null, [Validators.minLength(3), Validators.required]);
  rfid: FormControl = new FormControl(null, Validators.required);
  saldoEstoque: FormControl = new FormControl(null, Validators.required);
  precoCompra: FormControl = new FormControl(null, Validators.required);
  precoCopo: FormControl = new FormControl(null, Validators.required);

  constructor(
    private service: ChopesService,
    private location: Location,
    private toast: ToastrService,
    private router: Router,
    public rfidService: RfidService,
  ) {
    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }

  }

  validaCampos(): boolean {
    return this.nome.valid &&
      this.rfid.valid &&
      this.saldoEstoque.valid &&
      this.precoCompra.valid &&
      this.precoCopo.valid
  }

  create(): void {
    this.chope.rfid = this.rfidService.rfid;
    this.service.create(this.chope).subscribe(() =>{
      this.toast.success('Chope cadastrado com sucesso!', 'Cadastro de Chope');
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
