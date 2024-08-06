import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SiteService } from 'src/app/service/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-site',
  templateUrl:'./add-site.component.html',
  styleUrls: ['./add-site.component.css']
})
export class AddSiteComponent {
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

constructor(private siteService:SiteService , private router:Router){}

  AddSite(){
    console.log("site",this.site)
   this.siteService.storeSite(this.site)
   .subscribe((res:any)=>{
    this.site= {
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

    this.router.navigate(['/listSite'])

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Site ajoutée avec succées ! ",
      showConfirmButton: false,
      timer: 1500
    });
   })
  }
}
