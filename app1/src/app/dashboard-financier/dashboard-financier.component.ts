import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-financier',
  templateUrl: './dashboard-financier.component.html',
  styleUrls: ['./dashboard-financier.component.css']
})
export class DashboardFinancierComponent {
  activeDropdown: string | null = null;

  toggleDropdown(event: Event, dropdown: string): void {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
  }
}
