import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Notificacao} from "../../../models/notificacao";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificacaoService} from "../../../services/notificacao.service";
import {Cliente} from "../../../models/cliente";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {NotificacaoUpdateComponent} from "../../notificacao/notificacao-update/notificacao-update.component";

@Component({
  selector: 'app-notificacao-list',
  templateUrl: './notificacao-list.component.html',
  styleUrls: ['./notificacao-list.component.scss']
})
export class NotificacaoListComponent implements OnInit{

  ELEMENT_DATA: Notificacao[] = [];

  displayedColumns: string[] = ['id_notificao','mensagem', 'data', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Notificacao>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private service: NotificacaoService
  ) {
    if(localStorage.getItem('usuario') == null){
      console.log(localStorage.getItem('usuario'));
      this.router.navigate(['/login']);
    }

  }

  ngOnInit() {
    this.findAll();
    this.dialog.afterAllClosed.subscribe(_ => {
      this.findAll();
    });
  }

  findAll(){
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Notificacao>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  confirmarPreparo(notificacao: Notificacao) {
    this.dialog.open(NotificacaoUpdateComponent, {
      width: '600px',
      data: notificacao
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
