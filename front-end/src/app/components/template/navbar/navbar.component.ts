import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  nomeUsuarioLogado?: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }

  estaLogado() {
    if(localStorage.getItem('usuario') == null){
      return false;
    }
    this.nomeUsuarioLogado = JSON.parse(localStorage.getItem('usuario') || '').nome;
    return true;
  }


  logout(): void{
    localStorage.removeItem("usuario");
    this.router.navigate(['/login']);
  }
}
