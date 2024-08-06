import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  regions: string[] = ['region1', 'region2', 'region3'];
  delegotions: any ; // Initialize as an empty array
  sites: any[] = []; // Initialize as an empty array
  apdFile: File | null = null;
  expertiseFile: File | null = null;
  fvrFile: File | null = null;
  selectedSiteCode: string | null = null; 

  constructor(private route: ActivatedRoute,private siteService: SiteService, private router: Router) {}

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

 

  ajouterArchive(): void {
    // Prepare form data
    const formData = new FormData();
    formData.append('ficheMisService', this.expertiseFile|| '');
    formData.append('APD', this.apdFile || '');
    formData.append('ficheExp', this.fvrFile || '');

    // Send the form data to the server with codesite as a query parameter
    this.siteService.storearchive(this.selectedSiteCode, formData).subscribe(
      (response: any) => {
        console.log('Archive added successfully:', response);
        // Handle success
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Archive  ajoutée avec succées ! ",
          showConfirmButton: false,
          timer: 1500
        });
        
      },
      (error: any) => {
        console.error('Error adding archive:', error);
        // Handle error
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
    this.delegotions = [];
    this.sites = [];

    Swal.fire(
      'Annulé',
      'Le formulaire a été réinitialisé.',
      'success'
    );



  }





}















  





