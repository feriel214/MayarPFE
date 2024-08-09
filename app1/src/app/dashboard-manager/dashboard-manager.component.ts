import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-manager',
  templateUrl: './dashboard-manager.component.html',
  styleUrls: ['./dashboard-manager.component.css']
})
export class DashboardManagerComponent {
  activeDropdown: string | null = null;

  toggleDropdown(event: Event, dropdown: string): void {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
  }
}
