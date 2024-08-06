import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SiteService } from 'src/app/service/site.service';
import Swal from 'sweetalert2';















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
  regions: string[] = ['region1', 'region2', 'region3'];
  cellules:string[] = ['Cellule2G', 'Cellule3G', 'Cellule4G'];
  delegotions: any[] = [];
  fournisseurs: any[] = [];
  sites: any[] = [];
  selectedSiteCode: any;
  selectedidSite: any;
  // selectedidCel: any;
  // celluleData: any[] = [];
  // selectedTechnology: string | null = null;




  selectedidCel: string | null = null;
  selectedTechnology: string | null = null;
  celluleData: any = {};






  constructor(private route: ActivatedRoute, private siteService: SiteService, private router: Router) {}

  ngOnInit(): void {
    this.updateDelegations();
  }
  updateDelegations(): void {
    this.siteService.getdelegbyregion(this.site.region).subscribe(
      (response: any[]) => {
        console.log('region', this.site.region);
        this.delegotions = response.map((site: any) => site.delegotion);
        console.log("Selected delegations: ", this.delegotions);
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





  // onCelluleSelect(event: Event): void {
  //   const selectElement = event.target as HTMLSelectElement;
  //   const cellule = selectElement.value;

  //   if (cellule === 'Cellule2G') {
  //     this.siteService.getcel2GByCode(this.selectedSiteCode).subscribe(
  //       response => {
  //         console.log('2G data:', response);
  //         // Traitez la réponse ici
  //       },
  //       error => {
  //         console.error('Error fetching 2G data:', error);
  //       }
  //     );
  //   } else if (cellule === 'Cellule3G') {
  //     this.siteService.getcel3GByCode(this.selectedSiteCode).subscribe(
  //       response => {
  //         console.log('3G data:', response);
  //         // Traitez la réponse ici
  //       },
  //       error => {
  //         console.error('Error fetching 3G data:', error);
  //       }
  //     );
  //   } else if (cellule === 'Cellule4G') {
  //     this.siteService.getcel4GByCode(this.selectedSiteCode).subscribe(
  //       response => {
  //         console.log('4G data:', response);
  //         // Traitez la réponse ici
  //       },
  //       error => {
  //         console.error('Error fetching 4G data:', error);
  //       }
  //     );
  //   }
  // }






  // onCelluleSelect(event: Event): void {
  //   const selectElement = event.target as HTMLSelectElement;
  //   const cellule = selectElement.value;

  //   if (cellule === 'Cellule2G') {
  //     this.siteService.getcel2GByCode(this.selectedSiteCode).subscribe(
  //       response => {
  //         console.log('2G data:', response);
  //         this.celluleData = response; // Store data in celluleData
  //       },
  //       error => {
  //         console.error('Error fetching 2G data:', error);
  //       }
  //     );
  //   } else if (cellule === 'Cellule3G') {
  //     this.siteService.getcel3GByCode(this.selectedSiteCode).subscribe(
  //       response => {
  //         console.log('3G data:', response);
  //         this.celluleData = response; // Store data in celluleData
  //       },
  //       error => {
  //         console.error('Error fetching 3G data:', error);
  //       }
  //     );
  //   } else if (cellule === 'Cellule4G') {
  //     this.siteService.getcel4GByCode(this.selectedSiteCode).subscribe(
  //       response => {
  //         console.log('4G data:', response);
  //         this.celluleData = response; // Store data in celluleData
  //       },
  //       error => {
  //         console.error('Error fetching 4G data:', error);
  //       }
  //     );
  //   }
  // }



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










}
