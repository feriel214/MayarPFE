import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';
import { SiteService } from 'src/app/service/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-documentation-site',
  templateUrl: './documentation-site.component.html',
  styleUrls: ['./documentation-site.component.css']
})

export class DocumentationSiteComponent {
  site = {
    codesite: '',
    nomsite: '',
    region: '',
    delegotion: '', // Keeping the field name as delegotion
    secteur: '',
    x: 0,
    y: 0,
    fournisseur: '',
    HBA: '',
    antenne: '',
    alimentation: '',
    acces: ''
  };

  regions: any[] = []; // Dynamiquement peuplé
  delegations: any[] = []; // Dynamiquement peuplé
  filteredDelegations : any[] = [];
  sites: any[] = []; // Dynamiquement peuplé
  apdFile: File | null = null;
  expertiseFile: File | null = null;
  fvrFile: File | null = null;
  selectedSiteCode: string | null = null; 

  constructor(private route: ActivatedRoute,private siteService: SiteService, private router: Router , private adminService:AdminService) {}

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
        this.sites = response; // Assign the array of site objects to this.sites
      },
      (error: any) => {
        console.error('Error fetching sites:', error);
      }
    );
  }

  storecodesite(id: any): void {
    this.selectedSiteCode = id;
    console.log('Selected Site Code:', this.selectedSiteCode);
  }
  
  
  handleAPDFileInput(event: any): void {
    this.apdFile = event.target.files[0];
  }

  handleExpertiseFileInput(event: any): void {
    this.expertiseFile = event.target.files[0];
  }

  handleFVRFileInput(event: any): void {
    this.fvrFile = event.target.files[0];
  }

 

  // ajouterArchive(): void {
  //   // Prepare form data
  //   const formData = new FormData();
  //   formData.append('ficheMisService', this.expertiseFile|| '');
  //   formData.append('APD', this.apdFile || '');
  //   formData.append('ficheExp', this.fvrFile || '');

  //   // Send the form data to the server with codesite as a query parameter
  //   this.siteService.storearchive(this.selectedSiteCode, formData).subscribe(
  //     (response: any) => {
  //       console.log('Archive added successfully:', response);
  //       // Handle success
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: "Archive  ajoutée avec succées ! ",
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
        
  //     },
  //     (error: any) => {
  //       console.error('Error adding archive:', error);
  //       // Handle error
  //     }
  //   );
  // }

  ajouterArchive(): void {
    // Préparer les données du formulaire
    const formData = new FormData();
    formData.append('ficheMisService', this.expertiseFile || '');
    formData.append('APD', this.apdFile || '');
    formData.append('ficheExp', this.fvrFile || '');
  
    // Envoyer les données du formulaire au serveur avec le codesite en paramètre de requête
    this.siteService.storearchive(this.selectedSiteCode, formData).subscribe(
      (response: any) => {
        console.log('Archive ajoutée avec succès:', response);
        // Gérer le succès
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Archive ajoutée avec succès !",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout de l\'archive:', error);
        // Gérer l'erreur avec un Swal
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Une erreur s'est produite lors de l'ajout de l'archive. Veuillez vérifier les fichiers et réessayer.",
          confirmButtonText: 'OK'
        });
      }
    );
  }
  


  annuler(): void {
    this.site = {
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
    this.apdFile = null;
    this.expertiseFile = null;
    this.fvrFile = null;
    this.selectedSiteCode = null;
    this.delegations = [];
    this.sites = [];

    Swal.fire(
      'Annulé',
      'Le formulaire a été réinitialisé.',
      'success'
    );



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















  





