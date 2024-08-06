import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SiteService } from 'src/app/service/site.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-report1',
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.css'],
  animations: [
    // Assurez-vous que les animations nécessaires sont correctement définies ici
  ]
})
export class Report1Component implements OnInit {
  plotUrl: SafeResourceUrl = '';
  plotUrl2: SafeResourceUrl = '';
  plotUrl3: SafeResourceUrl = '';
  constructor(private sanitizer: DomSanitizer ,private dataService: SiteService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.plotUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/plot.html');
    this.plotUrl2 = this.sanitizer.bypassSecurityTrustResourceUrl('assets/pie_chart_gouvernorat.html');
    this.plotUrl3 = this.sanitizer.bypassSecurityTrustResourceUrl('assets/carte_antennes.html');






  }


  siteName: string = '';
  data: any[] = [];
  tableData: any[] = []; // New array to hold data for table




  filterData(): void {
    if (this.siteName.trim()) {
      this.spinner.show(); // Afficher le spinner
      this.dataService.getFilteredData(this.siteName).subscribe(
        (filteredData: any[]) => {
          this.data = filteredData;
          console.log('Filtered Data:', this.data); // Afficher les données filtrées dans la console
          this.generateTableData(); // Générer les données de la table
          this.spinner.hide(); // Cacher le spinner après le chargement des données
        },
        error => {
          console.error('Error fetching filtered data:', error); // Afficher l'erreur dans la console en cas d'échec de la requête
          this.spinner.hide(); // Cacher le spinner en cas d'erreur
          // Gérer l'erreur de manière appropriée (par exemple, afficher un message à l'utilisateur)
        }
      );
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
