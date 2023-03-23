import {Component, OnInit} from '@angular/core';
import {Chope} from "../../../models/chope";
import {FormControl, Validators} from "@angular/forms";
import {ChopesService} from "../../../services/chopes.service";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-chop-update',
  templateUrl: './chop-update.component.html',
  styleUrls: ['./chop-update.component.scss']
})
export class ChopUpdateComponent implements OnInit{

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
    private route: ActivatedRoute,
  ) {
    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }
  }
  validaCampos(): boolean {
    return this.nome.valid &&
      this.saldoEstoque.valid &&
      this.precoCompra.valid &&
      this.precoCopo.valid
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
  update(): void {
    this.service.update(this.chope).subscribe(() =>{
      this.toast.success('Chope editado com sucesso!', 'Editar Chope');
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
