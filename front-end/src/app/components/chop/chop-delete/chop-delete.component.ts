import { Component } from '@angular/core';
import {Chope} from "../../../models/chope";
import {ChopesService} from "../../../services/chopes.service";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-chop-delete',
  templateUrl: './chop-delete.component.html',
  styleUrls: ['./chop-delete.component.scss']
})
export class ChopDeleteComponent {
  chope: Chope = {
    nome: '',
    rfid: '',
    saldoEstoque: 100,
    precoCompra: 0,
    precoCopo: 0,
  }

  constructor(
    private service: ChopesService,
    private location: Location,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }
  }
  ngOnInit() {
    this.chope.rfid = this.route.snapshot.paramMap.get('rfid');
    this.findByRfid();
  }

  findByRfid(): void {
    this.service.findByRfid(this.chope.rfid).subscribe(resposta => {
      this.chope = resposta;
    });
  }
  delete(): void {
    this.service.delete(this.chope.rfid).subscribe(() =>{
      this.toast.success('Chope excluído com sucesso!', 'Excluir Chope');
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
