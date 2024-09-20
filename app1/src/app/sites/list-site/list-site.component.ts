import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { SiteService } from 'src/app/service/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-site',
  templateUrl: './list-site.component.html',
  styleUrls: ['./list-site.component.css']
})
export class ListSiteComponent implements OnInit {

  ListSites: any = [];
  regions: any = [];
  delegations: any = [];
  secteurs: any = [];

  constructor(private siteService: SiteService, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getRegions();
    this.getDelegations();
    this.getSecteurs();
    this.getListSites();
  }

  getListSites() {
    this.siteService.getAllSites().subscribe((res: any) => {
      console.log("res get all sites", res);
      this.ListSites = res;
      this.populateNames(); // Appel après que les données des sites aient été récupérées
     // console.log("ListSites", this.ListSites);
    });
  }

  getRegions() {
    this.adminService.getAllRegions().subscribe((data: any) => {
      this.regions = data;
     // console.log("regions", this.regions);
    });
  }

  getDelegations() {
    this.adminService.getAllDelegations().subscribe((data: any) => {
      this.delegations = data;
     // console.log("delegations", this.delegations);
    });
  }

  getSecteurs() {
    this.adminService.getSecteurs().subscribe((data: any) => {
      this.secteurs = data;
      //console.log("secteurs", this.secteurs);
    });
  }

  populateNames() {
    this.ListSites = this.ListSites.map((site: any) => {
   
      return {
        ...site,
        region: this.regions.find((reg: any) => reg.idReg == site.region)?.libelleReg || site.region,
        delegotion: this.delegations.find((del: any) => del.idDel == site.delegotion)?.libelleDel || site.delegotion,
        secteur: this.secteurs.find((sec: any) => sec.idSecteur == site.secteur)?.libelleSec || site.secteur,
      };
    });
  }

  DeleteSite(id: any) {
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
        this.siteService.deleteSite(id).subscribe(() => {
          this.ngOnInit(); // Rafraîchir la liste après suppression
          Swal.fire({
            title: "Supprimé !",
            text: "Votre fichier a été supprimé.",
            icon: "success"
          });
        });
      }
    });
  }

  editSite(site: any) {
    this.router.navigate([`/admin/edit/site/${site.codesite}`]);
  }
}
