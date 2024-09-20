import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';
import { SiteService } from 'src/app/service/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cellule2-g',
  templateUrl: './cellule2-g.component.html',
  styleUrls: ['./cellule2-g.component.css']
})
export class Cellule2GComponent {

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

  cellule = {
    codeCellule: '',
    nomCellule: '',
    lac: '',
    bcch: '',
    power: '',
    mlt: '',
    azimuth: '',
    bande: 0,
  };

  newcellule = {
    codeCellule: '',
    nomCellule: '',
    lac: '',
    bcch: '',
    power: '',
    mlt: '',
    azimuth: '',
    bande: 0,
  };

  regions: any[] = []; // Dynamiquement peuplé
  delegations: any[] = []; // Dynamiquement peuplé
  filteredDelegations : any[] = [];
  sites: any[] = []; // Dynamiquement peuplé
  selectedSiteCode: any;
  selectedidSite: any;
  selectedidCel: any;
  cG2: any;

  constructor(private route: ActivatedRoute, private siteService: SiteService, private router: Router,private adminService:AdminService) {}

  ngOnInit(): void {
 
    this.updateDelegations();
    this.getRegions();
    this.getSites();
    this.getDelegations();
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

  updateSites(): void {
    console.log('Fetching sites...');
    this.siteService.getSitesByRegionAndDelegotion(this.site.region, this.site.delegotion).subscribe(
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
      },
      (error: any) => {
        console.error('Error fetching id Site:', error);
      }
    );
  }

  storeCellule() {
    console.log("cellule", this.cellule);
    
    this.siteService.storeCel2G(this.selectedidSite, this.cellule).subscribe(
      (res: any) => {
        // Réinitialiser les champs de la cellule après succès
        this.cellule = {
          codeCellule: '',
          nomCellule: '',
          lac: '',
          bcch: '',
          power: '',
          mlt: '',
          azimuth: '',
          bande: 0,
        };
  
        // Afficher une notification de succès
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Cellulle 2G ajoutée avec succès !",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error: any) => {
        console.error("Erreur lors de l'ajout de la cellule 2G:", error);
        
        // Afficher une notification d'erreur
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Une erreur s'est produite lors de l'ajout de la cellule 2G. Veuillez réessayer.",
          confirmButtonText: 'OK'
        });
      }
    );
  }
  
  updateData() {
    this.siteService.getidBycode2G(this.newcellule.codeCellule).subscribe(
      (response: any) => {
        this.selectedidCel = response.idCel;
        console.log('Selected id cellule:', this.selectedidCel);

        this.siteService.getcel2GById(this.selectedidCel).subscribe(
          (res: any) => {
            console.log("API response:", res);
            if (res && res.length > 0) {
              console.log("Response data:", res[0]);
              const updatedCellule = {
                ...(this.newcellule.codeCellule && { codeCellule: this.newcellule.codeCellule }),
                ...(this.newcellule.nomCellule && { nomCellule: this.newcellule.nomCellule }),
                ...(this.newcellule.lac && { lac: this.newcellule.lac }),
                ...(this.newcellule.bcch && { bcch: this.newcellule.bcch }),
                ...(this.newcellule.power && { power: this.newcellule.power }),
                ...(this.newcellule.mlt && { mlt: this.newcellule.mlt }),
                ...(this.newcellule.azimuth && { azimuth: this.newcellule.azimuth }),
                ...(this.newcellule.bande && { bande: this.newcellule.bande }),
              };

              this.siteService.updatecel2G(this.selectedidCel, updatedCellule).subscribe(
                (updateRes: any) => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Cellule updated successfully!',
                  });
                },
                (updateError: any) => {
                  console.error('Error updating cellule:', updateError);
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to update cellule!',
                  });
                }
              );
            } else {
              console.error("No data found for the given ID");
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No cellule data found!',
              });
            }
          },
          (error: any) => {
            console.error('Error fetching cellule data:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed to fetch cellule data!',
            });
          }
        );
      },
      (error: any) => {
        console.error('Error fetching id cellule:', error);
      }
    );
  }

  showUpdateForm: boolean = false;
  cancelUpdate() {
    this.showUpdateForm = false;
  }


  getRegions() {
    this.adminService.getAllRegions().subscribe((data: any) => {
      this.regions = data;
      console.log("regions ", this.regions)
    });
  }

  // Obtenir toutes les délégations
  getDelegations() {
    this.adminService.getAllDelegations().subscribe((data: any) => {
      this.delegations = data;
      console.log("delegations ", this.delegations)
    });
  }

getSites(){
  this.siteService.getAllSites().subscribe((data: any) => {
    this.sites = data;
    console.log("sites ", this.sites)
  });

}


onRegionChange(regionId: any) {
  console.log("onregion change : regionId", regionId);
  
  // Correction du filtre en ajoutant le 'return'
  this.filteredDelegations = this.delegations.filter((del: any) => {
    return del.region_id == regionId;  // Ajout du return
  });

  // Réinitialiser la sélection de la délégation et des secteurs
  this.site.delegotion = '';

  console.log("filteredDelegations", this.filteredDelegations);  // Ajout pour vérifier les résultats
}
}
