import { Component} from '@angular/core';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {
  isDropdownOpen = false;

  toggleDropdown(event: Event): void {
    event.preventDefault(); // Prevent default link behavior
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}