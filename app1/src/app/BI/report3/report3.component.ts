import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/service/site.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-report3',
  templateUrl: './report3.component.html',
  styleUrls: ['./report3.component.css']
})
export class Report3Component implements OnInit {

  siteName: string = '';
  data: any[] = [];
  tableData: any[] = []; // New array to hold data for table

  constructor(private dataService: SiteService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {}

  filterData(): void {
    if (this.siteName.trim()) {
      this.spinner.show(); // Show spinner
      this.dataService.getFilteredData(this.siteName).subscribe(filteredData => {
        this.data = filteredData;
        console.log('Filtered Data:', this.data); // Log filtered data
        this.generateTableData(); // Generate table data
        this.spinner.hide(); // Hide spinner after data is loaded
      }, error => {
        console.error('Error fetching filtered data:', error); // Log error if any
        this.spinner.hide(); // Hide spinner on error
      });
    }
  }

  generateTableData(): void {
    this.tableData = this.data.map(d => ({
      variable: d.Variable,
      value: this.parseValue(d.Valeur)
    }));
  }

  parseValue(value: any): number {
    if (typeof value === 'string') {
      return parseFloat(value.replace(',', '.').replace(/[^\d.-]/g, ''));
    }
    return value;
  }
}
