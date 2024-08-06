import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteService } from 'src/app/service/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-site',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.css']
})
export class EditSiteComponent implements OnInit {
  codesite1: any;
  data: any;
  site = {
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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private siteService: SiteService) { }

  ngOnInit(): void {
    this.codesite1 = this.route.snapshot.params['id'];
    this.getById(this.codesite1);

    console.log("code site ............",this.codesite1);
    console.log("l objet ",this.site)
  }

  getById(id: any): void  {
    this.siteService.getSiteById(this.codesite1).subscribe(res => {
      // Map the response to site object properties
      console.log("......... res mayar  ",res[0])
      this.site.codesite = res[0].codesite;
      this.site.nomsite = res[0].nomsite;
      this.site.region = res[0].region;
      this.site.delegotion = res[0].delegotion;
      this.site.secteur = res[0].secteur;
      this.site.x = res[0].x;
      this.site.y = res[0].y;
      this.site.fournisseur = res[0].fournisseur;
      this.site.HBA = res[0].HBA;
      this.site.antenne = res[0].antenne;
      this.site.alimentation = res[0].alimentation;
      this.site.acces = res[0].acces;
   
    }, error => {
      console.error('Error fetching site data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to fetch site data!',
      });
    });
  }

  updateSite() {
    this.siteService.updateSite(this.codesite1, this.site).subscribe(res => {
      
      this.refresh();
      this.router.navigate(['/listSite']);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Site updated successfully!',
      });
    }, error => {
      console.error('Error updating site:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update site!',
      });
    });
  }
  
  refresh(){
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
  
  }


  backSite(){
  
    this.router.navigate(['/home/listSite']);

  }


}
