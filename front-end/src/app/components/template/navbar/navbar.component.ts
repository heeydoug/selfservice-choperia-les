import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {RfidService} from "../../../services/rfid.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  nomeUsuarioLogado?: string;

  @ViewChild('sidenav') sidenav: any;


  constructor(private router: Router,
              public rfidService: RfidService) {
  }

  ngOnInit(): void {

  }

  toggleSidenav() {
    this.sidenav.toggle();
  }


  estaLogado() {
    if(localStorage.getItem('usuario') == null){
      return false;
    }
    this.nomeUsuarioLogado = JSON.parse(localStorage.getItem('usuario') || '').nome;
    return true;
  }

  veririficarUsuario(tela: string): boolean {
    if(localStorage.getItem('usuario')) {
      let usuario = JSON.parse(localStorage.getItem('usuario') || '');

      for(let i = 0; i < usuario.telas.length; i++ ) {
        if(usuario.telas[i].nome === tela) {
          return true;
        }
      }
      return false;
    }

    return false;

  }


  logout(): void{
    localStorage.removeItem("usuario");
    this.router.navigate(['/login']);
  }
}
