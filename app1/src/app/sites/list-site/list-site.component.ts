import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/service/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-site',
  templateUrl: './list-site.component.html',
  styleUrls: ['./list-site.component.css']
})
export class ListSiteComponent implements OnInit {

  ListSites:any;
  constructor( private siteService:SiteService){

  }
  ngOnInit(): void {
    this.getListSites();
  }


  getListSites(){
    this.siteService.getAllSites()
   .subscribe((res:any)=>{
      console.log("res get aml sites ",res)
      this.ListSites=res;
   })
  }

  


  DeleteSite(id:any) {
    Swal.fire({
      title: "Êtes-vous sûr(e) ?",
      text: "Voulez-vous vraiment supprimer le site ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer !"
    }).then((result) => {
      if (result.isConfirmed) {
        //call api delete site service
        this.siteService.deleteSite(id)
        .subscribe((res:any)=>{
          this.ngOnInit();
          Swal.fire({
            title: "Supprimé !",
            text: "Votre fichier a été supprimé.",
            icon: "success"
          });
        })
      }
    });
  }
  

  editSite(site:any){

  }

}
