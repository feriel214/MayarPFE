import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SiteService } from 'src/app/service/site.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-tabdeboard-cellule',
  templateUrl: './tabdeboard-cellule.component.html',
  styleUrls: ['./tabdeboard-cellule.component.css']
})
export class TabdeboardCelluleComponent {




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
  APDUrl:string | undefined;
  ficheExpUrl:string | undefined;
  contractUrl: string | undefined;
  docFinanciereData: any = {}; 
  siteData: any[] = [];
  cellules:string[] = ['Cellule2G', 'Cellule3G', 'Cellule4G'];
  regions: any[] = []; // Dynamiquement peuplé
  delegations: any[] = []; // Dynamiquement peuplé
  filteredDelegations : any[] = [];
  filteredSites  : any[] = [];
  sites: any[] = []; // Dynamiquement peuplé
  fournisseurs: any[] = [];
  selectedSiteCode: any;
  selectedidSite: any;
  // selectedidCel: any;
  // celluleData: any[] = [];
  // selectedTechnology: string | null = null;




  selectedidCel: string | null = null;
  selectedTechnology: string | null = null;
  celluleData: any = {};






  constructor(private service: AdminService,private route: ActivatedRoute, private siteService: SiteService, private router: Router) {}

  ngOnInit(): void {
    this.updateDelegations();
    this.getRegions();
    this.getSites();
    this.getDelegations();
    this.getFournisseurs();
  }
  updateDelegations(): void {
    this.siteService.getdelegbyregion(this.site.region).subscribe(
      (response: any[]) => {
        console.log('region', this.site.region);
        this.delegations = response.map((site: any) => site.delegotion);
        console.log("Selected delegations: ", this.delegations);
      },
      (error: any) => {
        console.error('Error fetching delegations:', error);
      }
    );
  }

  updateFournisseur(): void{

    console.log('Fetching Fournisseurs...');
    this.siteService.getFinanciereByRegionAndDelegotion(this.site.region, this.site.delegotion).subscribe(
      (response: any[]) => {
        console.log('fournisseurs:', response);
        this.fournisseurs = response;
      },
      (error: any) => {
        console.error('Error fetching sites:', error);
      }
    );}




  updateSites(): void {
    console.log('Fetching sites...');
    this.siteService.getSiteByRegionAndDelegotionAndFournisseur(this.site.region, this.site.delegotion,this.site.fournisseur).subscribe(
      (response: any[]) => {
        console.log('Sites:', response);
        this.sites = response;
      },
      (error: any) => {
        console.error('Error fetching sites:', error);
      }
    );
  }

  storecodesite(id: any): void {
    this.selectedSiteCode = id;
    console.log('Selected Site Code:', this.selectedSiteCode);

    this.siteService.getidSiteBycode(this.selectedSiteCode).subscribe(
      (response: any) => {
        this.selectedidSite = response.idSite;
        console.log('Selected id Site:', this.selectedidSite);
        // this.fetchSiteData();
        // this.fetchDocFinanciereData();
        // this.  fetchArchiveData();  
      },
      (error: any) => {
        console.error('Error fetching id Site:', error);
      }
    );
  }





  


  onCelluleSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTechnology = selectElement.value;

    if (this.selectedTechnology === 'Cellule2G') {
      this.siteService.getcel2GByCode(this.selectedSiteCode).subscribe(
        response => {
          console.log('2G data:', response);
          this.celluleData = response;
        },
        error => {
          console.error('Error fetching 2G data:', error);
          this.celluleData = []; // Reset data on error
        }
      );
    } else if (this.selectedTechnology === 'Cellule3G') {
      this.siteService.getcel3GByCode(this.selectedSiteCode).subscribe(
        response => {
          console.log('3G data:', response);
          this.celluleData = response;
        },
        error => {
          console.error('Error fetching 3G data:', error);
          this.celluleData = []; // Reset data on error
        }
      );
    } else if (this.selectedTechnology === 'Cellule4G') {
      this.siteService.getcel4GByCode(this.selectedSiteCode).subscribe(
        response => {
          console.log('4G data:', response);
          this.celluleData = response;
        },
        error => {
          console.error('Error fetching 4G data:', error);
          this.celluleData = []; // Reset data on error
        }
      );
    }
  }


  exportToPDF(): void {
    const doc = new jsPDF();
    
    autoTable(doc, {
      head: [['Azimuth', 'Bande', 'BCCH', 'Code Cellule', 'LAC', 'MLT', 'Nom Cellule', 'Power']],
      body: this.celluleData.map((data: any) => [
        data.azimuth,
        data.bande,
        data.bcch,
        data.codeCellule,
        data.lac,
        data.mlt,
        data.nomCellule,
        data.power
      ]),
    });
    
    doc.save('cellule-data.pdf');
  }

  exportToCSV(): void {
    const csvData = this.convertToCSV(this.celluleData);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'cellule-data.csv');
  }

  convertToCSV(data: any): string {
    const header = ['Azimuth', 'Bande', 'BCCH', 'Code Cellule', 'LAC', 'MLT', 'Nom Cellule', 'Power'];
    const csvRows = [header.join(',')];
    
    data.forEach((row: any) => {
      const values = [
        row.azimuth,
        row.bande,
        row.bcch,
        row.codeCellule,
        row.lac,
        row.mlt,
        row.nomCellule,
        row.power
      ];
      csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
  }

  exportToExcel(): void {
    const csvData = this.convertToCSV(this.celluleData);
    const blob = new Blob([csvData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;' });
    saveAs(blob, 'cellule-data.xlsx');
  }

  // Obtenir toutes les régions
  getRegions() {
    this.service.getAllRegions().subscribe((data: any) => {
      this.regions = data;
    //  console.log("regions ", this.regions)
    });
  }

  // Obtenir toutes les délégations
  getDelegations() {
    this.service.getAllDelegations().subscribe((data: any) => {
      this.delegations = data;
    //  console.log("delegations ", this.delegations)
    });
  }

 

  onRegionChange(regionId: any) {
   // console.log("Changement de région, région sélectionnée:", regionId);
    
    // Filtrer les délégations par région sélectionnée
    this.filteredDelegations = this.delegations.filter((del: any) => {
      return del.region_id == regionId;  // Vérifiez que 'region_id' est correct
    });
    
    // Réinitialiser la sélection de la délégation
    this.site.delegotion = '';
 
  //  console.log("Délégations filtrées:", this.filteredDelegations);
  }

  onDelegationChange(delegotionId: any) {
   // console.log("Changement de délégation, délégation sélectionnée:", delegotionId);
  
    // Filtrer les sites par délégation sélectionnée
    this.filteredSites = this.sites.filter((site: any) => {
      return site.delegotion == delegotionId; // Filtrer les sites selon l'ID de la délégation
    });

   
  
   
  }
getSites(){
  this.siteService.getAllSites().subscribe((data: any) => {
    this.sites = data;
//    console.log("sites ", this.sites)
  });

}

getFournisseurs() {
  this.service.getFournisseurs().subscribe((data: any) => {
    this.fournisseurs = data;
   // console.log("++++++++++fournisseurs", this.fournisseurs)
  });
}





}



