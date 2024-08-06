import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  tableauVisible: boolean = false;

  toggleTable() {
    this.tableauVisible = !this.tableauVisible;
  }



  toggleMenu() {
    const navFostrap = document.querySelector('.nav-fostrap');
    const body = document.body;
    if (navFostrap && body) {
      navFostrap.classList.toggle('visible');
      body.classList.toggle('cover-bg');
    }
  }

  
}


