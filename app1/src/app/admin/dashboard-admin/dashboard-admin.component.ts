import { Component} from '@angular/core';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {
  activeDropdown: string | null = null;

  toggleDropdown(event: Event, dropdown: string): void {
    event.preventDefault(); // Prevent default link behavior
    this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
  }
  

}