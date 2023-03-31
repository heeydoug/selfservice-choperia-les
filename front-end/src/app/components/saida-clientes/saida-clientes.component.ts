import {AfterViewInit, Component} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ClientesService} from "../../services/clientes.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-saida-clientes',
  templateUrl: './saida-clientes.component.html',
  styleUrls: ['./saida-clientes.component.scss']
})
export class SaidaClientesComponent implements AfterViewInit{
  rfid: string = "";

  constructor(
    private toast: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private clienteService: ClientesService
  ) {
    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit() {
    this.focusInputRfid();
  }

  focusInputRfid(): void{
    let blurElement: HTMLElement = document.getElementById("rfidInput") as HTMLElement;
    blurElement.blur();

    setTimeout(function(){
      let focusElement: HTMLElement = document.getElementById("rfidInput") as HTMLElement;
      focusElement.focus();
    },0);
  }

  procurarRFID() {
    if(this.rfid.length === 10){
      this.toast.warning('Cartão Vazio!')
      this.rfid = "";
      this.focusInputRfid();
    }

  }
}
