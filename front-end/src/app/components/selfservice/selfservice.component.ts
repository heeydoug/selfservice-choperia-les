import { Component } from '@angular/core';
import {SelfService} from "../../models/selfservice";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-selfservice',
  templateUrl: './selfservice.component.html',
  styleUrls: ['./selfservice.component.scss']
})
export class SelfserviceComponent {

  selfservice: SelfService = {
    rfid: '',
    nome: '',
    precoKg: 0,
    peso: 0,
    valorTotal: 0
  }

  precoKg: FormControl = new FormControl(null, Validators.required);
  peso: FormControl = new FormControl(null, Validators.required);
  valorTotal: FormControl = new FormControl(null, Validators.required);

  constructor(
    private router: Router
  ) {
  }


  abrirCriarNotificacao() {
    this.router.navigate(['selfservice/registrarNotificacao']);
  }
}
