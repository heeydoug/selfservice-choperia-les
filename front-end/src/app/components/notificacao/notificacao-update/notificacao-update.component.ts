import {Component, Inject} from '@angular/core';
import {Notificacao} from "../../../models/notificacao";
import {NotificacaoService} from "../../../services/notificacao.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {finalize, first} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-notificacao-update',
  templateUrl: './notificacao-update.component.html',
  styleUrls: ['./notificacao-update.component.scss']
})
export class NotificacaoUpdateComponent {

  public notificacao: Notificacao;
  constructor(
    public dialogRef: MatDialogRef<NotificacaoUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notificacao,
    private toast: ToastrService,
    private service: NotificacaoService,


  ) {
    this.notificacao = data;
  }

  ngOnInit(): void {

  }

  confirmarPreparo() {
    this.service.update(this.notificacao.id_notificao)
      .subscribe(()=>{
        this.toast.success('Confirmação de preparo enviada com sucesso!', 'Confirmar Preparo');
        this.service.findAll();
        this.dialogRef.close(true);
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
    this.dialogRef.close(true);

  }
}
