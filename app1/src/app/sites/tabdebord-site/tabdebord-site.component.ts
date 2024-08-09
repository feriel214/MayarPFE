import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteService } from 'src/app/service/site.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Assurez-vous que ceci est importé correctement
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-tabdebord-site',
  templateUrl: './tabdebord-site.component.html',
  styleUrls: ['./tabdebord-site.component.css']
})
export class TabdebordSiteComponent implements OnInit {
  site = {
    idSite: '',
    codesite: '',
    nomsite: '',
    region: '',
    delegotion: '',
    secteur: '',
    x: 0,
    y: 0,
    fournisseur: '',
    HBA: '',
    antenne: '',
    alimentation: '',
    acces: ''
  };

  archiveData: any;
  ficheMisServiceUrl: string | undefined;
  APDUrl: string | undefined;
  ficheExpUrl: string | undefined;
  show: string | undefined;
  contractUrl: string | undefined;
  docFinanciereData: any = {};
  siteData: any[] = [];
  regions: string[] = ['region1', 'region2', 'region3'];
  delegotions: any[] = [];
  fournisseurs: any[] = [];
  sites: any[] = [];
  selectedSiteCode: any;
  selectedidSite: any;
  selectedidCel: any;

  constructor(private route: ActivatedRoute, private siteService: SiteService, private router: Router) {}

  ngOnInit(): void {
    this.updateDelegations();
  }

  updateDelegations(): void {
    this.siteService.getdelegbyregion(this.site.region).subscribe(
      (response: any[]) => {
        this.delegotions = response.map((site: any) => site.delegotion);
      },
      (error: any) => {
        console.error('Error fetching delegations:', error);
      }
    );
  }

  updateFournisseur(): void {
    this.siteService.getFinanciereByRegionAndDelegotion(this.site.region, this.site.delegotion).subscribe(
      (response: any[]) => {
        this.fournisseurs = response;
      },
      (error: any) => {
        console.error('Error fetching fournisseurs:', error);
      }
    );
  }

  updateSites(): void {
    this.siteService.getSiteByRegionAndDelegotionAndFournisseur(this.site.region, this.site.delegotion, this.site.fournisseur).subscribe(
      (response: any[]) => {
        this.sites = response;
      },
      (error: any) => {
        console.error('Error fetching sites:', error);
      }
    );
  }

  storecodesite(id: any): void {
    this.selectedSiteCode = id;
    this.siteService.getidSiteBycode(this.selectedSiteCode).subscribe(
      (response: any) => {
        this.selectedidSite = response.idSite;
        this.fetchSiteData();
        this.fetchDocFinanciereData();
        this.fetchArchiveData();  
        this.show = "A";
      },
      (error: any) => {
        console.error('Error fetching id Site:', error);
      }
    );
  }

  fetchSiteData(): void {
    this.siteService.getSiteById(this.selectedSiteCode).subscribe(
      data => {
        this.siteData = data;
      },
      error => {
        console.error('Error fetching site data:', error);
      }
    );
  }

  fetchDocFinanciereData(): void {
    this.siteService.getDocById(this.selectedSiteCode).subscribe(
      data => {
        this.docFinanciereData = data.docFinanciere;
        this.contractUrl = data.contract_url;
      },
      error => {
        console.error('Error fetching doc financiere data:', error);
      }
    );
  }

  fetchArchiveData(): void {
    this.siteService.getArchById(this.selectedSiteCode).subscribe(
      data => {
        this.archiveData = data.archive;
        this.ficheMisServiceUrl = data.ficheMisService_url;
        this.APDUrl = data.APD_url;
        this.ficheExpUrl = data.ficheExp_url;
      },
      (error: any) => {
        console.error('Error fetching archive data:', error);
      }
    );
  }

 
  

  // Convert JSON to CSV
  convertToCSV(objArray: any[]): string {
    const header = Object.keys(objArray[0]);
    const csv = [
      header.join(','),
      ...objArray.map(row => header.map(fieldName => JSON.stringify(row[fieldName], this.replacer)).join(','))
    ].join('\r\n');
    return csv;
  }

  // Define the replacer function
  replacer(key: string, value: any): any {
    return value === null ? '' : value;
  }

  exportToPDF(): void {
    const dataElement = document.getElementById('report-content');
    if (dataElement) {
      html2canvas(dataElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
  
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        while (heightLeft >= 0) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          position = heightLeft - imgHeight;
        }
  
        pdf.save('report.pdf');
      }).catch(error => {
        console.error('Error generating PDF:', error);
      });
    } else {
      console.error('Element with id "report-content" not found.');
    }
  }
  
  
  // Exporter en CSV
  exportToCSV(): void {
    // Combinez toutes les données en un seul tableau
    const combinedData = [
      ...this.siteData.map(site => [
        site.idSite,
        site.nomsite,
        site.region,
        site.delegotion,
        site.secteur,
        site.x,
        site.y,
        site.fournisseur,
        site.antenne,
        site.alimentation,
        site.acces
      ]),
      ...this.docFinanciereData ? [[
        this.docFinanciereData.propritere,
        this.docFinanciereData.montant,
        this.docFinanciereData.datecontract,
        this.docFinanciereData.datemaj,
        this.docFinanciereData.contract
      ]] : [],
      ...this.archiveData ? [[
        this.archiveData.propritere,
        this.archiveData.montant,
        this.archiveData.datecontract,
        this.archiveData.datemaj,
        this.archiveData.contract
      ]] : []
    ];

    const csv = Papa.unparse({
      fields: ['Id Site', 'Nom Site', 'Region', 'Delegation', 'Secteur', 'X', 'Y', 'Fournisseur', 'Antenne', 'Alimentation', 'Acces'],
      data: combinedData
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Exporter en Excel
  exportToExcel(): void {
    // Combinez toutes les données en un seul tableau
    const combinedData = [
      ['Id Site', 'Nom Site', 'Region', 'Delegation', 'Secteur', 'X', 'Y', 'Fournisseur', 'Antenne', 'Alimentation', 'Acces'],
      ...this.siteData.map(site => [
        site.idSite,
        site.nomsite,
        site.region,
        site.delegotion,
        site.secteur,
        site.x,
        site.y,
        site.fournisseur,
        site.antenne,
        site.alimentation,
        site.acces
      ]),
      ...this.docFinanciereData ? [[
        this.docFinanciereData.propritere,
        this.docFinanciereData.montant,
        this.docFinanciereData.datecontract,
        this.docFinanciereData.datemaj,
        this.docFinanciereData.contract
      ]] : [],
      ...this.archiveData ? [[
        this.archiveData.propritere,
        this.archiveData.montant,
        this.archiveData.datecontract,
        this.archiveData.datemaj,
        this.archiveData.contract
      ]] : []
    ];

    const ws = XLSX.utils.aoa_to_sheet(combinedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, 'report.xlsx');
  }
}
