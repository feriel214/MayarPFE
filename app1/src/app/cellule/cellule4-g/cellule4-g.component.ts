import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteService } from 'src/app/service/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cellule4-g',
  templateUrl: './cellule4-g.component.html',
  styleUrls: ['./cellule4-g.component.css']
})
export class Cellule4GComponent {

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
    EnodB: '',
    tac: '',
    sc: '',
    power: '',
    mlt: '',
    azimuth: '',
    bande: 0,
  };

  newcellule = {
    codeCellule: '',
    nomCellule: '',
    EnodB: '',
    tac: '',
    sc: '',
    power: '',
    mlt: '',
    azimuth: '',
    bande: 0,
  };

  regions: string[] = ['region1', 'region2', 'region3'];
  delegotions: any[] = [];
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
        console.log('region', this.site.region);
        this.delegotions = response.map((site: any) => site.delegotion);
        console.log("Selected delegations: ", this.delegotions);
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
    this.siteService.storeCel4G(this.selectedidSite, this.cellule).subscribe((res: any) => {
      this.cellule = {
        codeCellule: '',
        nomCellule: '',
        EnodB: '',
        tac: '',
        sc: '',
        power: '',
        mlt: '',
        azimuth: '',
        bande: 0,
      };

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cellulle4G ajoutée avec succès!",
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  updateData() {
    this.siteService.getidBycode4G(this.newcellule.codeCellule).subscribe(
      (response: any) => {
        this.selectedidCel = response.idCel;
        console.log('Selected id cellule:', this.selectedidCel);

        this.siteService.getcel4GById(this.selectedidCel).subscribe(
          (res: any) => {
            console.log("API response:", res);
            if (res && res.length > 0) {
              console.log("Response data:", res[0]);
              const updatedCellule = {
                ...(this.newcellule.codeCellule && { codeCellule: this.newcellule.codeCellule }),
                ...(this.newcellule.nomCellule && { nomCellule: this.newcellule.nomCellule }),
                ...(this.newcellule.EnodB && { EnodB: this.newcellule.EnodB }),
                ...(this.newcellule.tac && { tac: this.newcellule.tac }),
                ...(this.newcellule.sc && { sc: this.newcellule.sc }),
                ...(this.newcellule.power && { power: this.newcellule.power }),
                ...(this.newcellule.mlt && { mlt: this.newcellule.mlt }),
                ...(this.newcellule.azimuth && { azimuth: this.newcellule.azimuth }),
                ...(this.newcellule.bande && { bande: this.newcellule.bande }),
              };

              this.siteService.updatecel4G(this.selectedidCel, updatedCellule).subscribe(
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
}
