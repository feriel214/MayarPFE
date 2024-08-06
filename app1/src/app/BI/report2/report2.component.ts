import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/service/site.service';
import * as Plotly from 'plotly.js-dist';

@Component({
  selector: 'app-report2',
  templateUrl: './report2.component.html',
  styleUrls: ['./report2.component.css']
})
export class Report2Component implements OnInit {

  siteName: string = '';
  data: any[] = [];

  constructor(private dataService: SiteService) {}

  ngOnInit(): void {}

  filterData(): void {
    if (this.siteName.trim()) {
      this.dataService.getFilteredData(this.siteName).subscribe(filteredData => {
        this.data = filteredData;
        this.renderChart();
      });
    }
  }

  renderChart(): void {
    // Explicitly define the type of plotData
    const plotData: Plotly.Data[] = [];

    // Iterate over filtered data and populate plotData
    this.data.forEach(d => {
      plotData.push({
        x: [d.Valeur], // Assuming 'Valeur' is your data value for the histogram
        type: 'histogram',
        name: d.Variable // Use 'Variable' for the name of each bar in the histogram
      });
    });

    const layout = {
      title: `Histogramme des valeurs pour le site ${this.siteName}`,
      xaxis: { title: 'Valeur' }, // Label for x-axis
      yaxis: { title: 'Count' }   // Label for y-axis (optional)
    };

    // Clear previous content of 'histogram' element
    Plotly.purge('histogram');

    // Create new histogram plot using Plotly
    Plotly.newPlot('histogram', plotData, layout);
  }
}
