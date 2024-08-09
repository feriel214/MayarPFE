import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  FullName!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getUserFromLocalStorage();
    console.log("//////////////////////userName", this.FullName);
  }

  getUserFromLocalStorage(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const userObject = JSON.parse(user);
      this.FullName = userObject.nom + ' ' + userObject.prenom;
    } else {
      this.FullName = 'Invité';
    }
  }

  logout(): void {
    localStorage.removeItem('user'); // Supprime l'utilisateur du localStorage
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }
}
