import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { SiteService } from 'src/app/service/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-site',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.css']
})
export class EditSiteComponent implements OnInit {
  codesite1: any;
  regions: any;
  delegations: any;
  secteurs: any;
  filteredDelegations: any[] = [];
  filteredSecteurs: any[] = [];
  filteredFournisseurs: any[] = [];
  fournisseurs: any;
  access: string[] = [ 'Terrestre', 'Sécurisé', 'Restreint', 'Public', 'Privé'];

// Alimentation pour le site GSM
 alimentation: string[] = [
    '48V',
    'Solaire',
    'Diesel',
    'Lithium',
    'AC'
];
  site = {
    codesite: '',
    nomsite: '',
    region: '',
    delegotion: '',
    secteur: '',
    x: 0,
    y: 0,
    fournisseur:'',
    HBA: '',
    antenne: '',
    alimentation: '',
    acces: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private siteService: SiteService,
    private service: AdminService // To get regions, delegations, etc.
  ) {
   
    
  }

  ngOnInit(): void {
    this.codesite1 = this.route.snapshot.params['id'];

    console.log("site à modifier : ",  this.codesite1 )
    // Load necessary data
    this.getRegions();
    this.getDelegations();
    this.getSecteurs();
    this.getFournisseurs();
    
    // Get site data
    this.getById();
  }

  // Get all regions, delegations, secteurs, and fournisseurs
  getRegions() {
    this.service.getAllRegions().subscribe((data: any) => {
      this.regions = data;
    });
  }

  getDelegations() {
    this.service.getAllDelegations().subscribe((data: any) => {
      this.delegations = data;
     
    });
  }

  getSecteurs() {
    this.service.getSecteurs().subscribe((data: any) => {
      this.secteurs = data;
    });
  }

  getFournisseurs() {
    this.service.getFournisseurs().subscribe((data: any) => {
      this.fournisseurs = data;
      console.log("++++++++++fournisseurs", this.fournisseurs)
    });
  }
  getById(): void {
    this.siteService.getSiteById(this.codesite1).subscribe(res => {
      const siteData = res[0];
      Object.assign(this.site, siteData);
  
     
    console.log("site",this.site)
     
    
      this.onRegionChange(this.site.region);
      this.onDelegationChange(this.site.delegotion);
    }, error => {
      console.error('Error fetching site data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to fetch site data!',
      });
    });
  }
  
  
  // Filter delegations based on selected region
  onRegionChange(regionId: any) {
    console.log("--------- regionId",regionId)
    this.filteredDelegations = this.delegations.filter((del : any) => del.region_id == regionId);
    
    // Reset delegation and sector selections
   // this.site.delegotion = '';
    this.filteredSecteurs = [];
  }


  // Filter sectors based on selected delegation
  onDelegationChange(delegationId: any) {
  
    this.filteredSecteurs = this.secteurs.filter((sec : any) => sec.delegation_id == delegationId);
    
  }

  // Update the site
  updateSite() {
    this.siteService.updateSite(this.codesite1, this.site).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Site updated successfully!',
      });
      this.router.navigate(['/listSite']);
    }, error => {
      console.error('Error updating site:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update site!',
      });
    });
  }

  // Navigate back to the site list
  backSite() {
    this.router.navigate(['/admin/list/sites']);
  }
}
