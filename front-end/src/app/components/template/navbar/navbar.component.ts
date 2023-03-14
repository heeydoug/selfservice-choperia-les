import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router) {
  }

  estaLogado() {
    if(localStorage.getItem('usuario') == null){
      return false;
    }
    return true;
  }

  logout(): void{
    localStorage.removeItem("usuario");
    this.router.navigate(['/login']);
  }
}
