import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-ing-radio',
  templateUrl: './dashboard-ing-radio.component.html',
  styleUrls: ['./dashboard-ing-radio.component.css']
})
export class DashboardIngRadioComponent {
  activeDropdown: string | null = null;

  toggleDropdown(event: Event, dropdown: string): void {
    event.preventDefault(); // Prevent default link behavior
    this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
  }
}
