import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { SiteService } from 'src/app/service/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-site',
  templateUrl:'./add-site.component.html',
  styleUrls: ['./add-site.component.css']
})
export class AddSiteComponent implements OnInit {
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
  
  regions: any;
  delegations: any;
  secteurs: any;
  filteredDelegations: any[] = [];  // Liste des délégations filtrées
  filteredSecteurs: any[] = [];     // Liste des secteurs filtrés
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
  constructor(private siteService: SiteService, private router: Router, private service: AdminService) {}

  ngOnInit(): void {
    this.getRegions();
    this.getDelegations();
    this.getSecteurs();
    this.getFournisseurs();
  }


 
  
  AddSite() {
    console.log("site", this.site);
    
    this.siteService.storeSite(this.site)
      .subscribe(
        (res: any) => {
          // Réinitialiser les champs du formulaire après ajout du site
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
  
          // Rediriger vers la liste des sites après succès
          this.router.navigate(['/listSite']);
  
          // Afficher une alerte de succès
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Site ajouté avec succès !",
            showConfirmButton: false,
            timer: 1500
          });
        },
        (error: any) => {
          console.error("Erreur lors de l'ajout du site:", error);
  
          // Afficher une alerte d'erreur en français
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Impossible d'ajouter le site. Veuillez vérifier les informations et réessayer.",
            confirmButtonText: "OK"
          });
        }
      );
  }
  
  getRegions() {
    this.service.getAllRegions().subscribe((data: any) => {
      this.regions = data;
      console.log("regions ", this.regions)
    });
  }

  // Obtenir toutes les délégations
  getDelegations() {
    this.service.getAllDelegations().subscribe((data: any) => {
      this.delegations = data;
      console.log("delegations ", this.delegations)
    });
  }

  // Obtenir tous les secteurs
  getSecteurs() {
    this.service.getSecteurs().subscribe((data: any) => {
      this.secteurs = data;
    });
  }

 // Filtrer les délégations selon la région sélectionnée
onRegionChange(regionId: any) {
  console.log("onregion change : regionId", regionId);
  
  // Correction du filtre en ajoutant le 'return'
  this.filteredDelegations = this.delegations.filter((del: any) => {
    return del.region_id == regionId;  // Ajout du return
  });

  // Réinitialiser la sélection de la délégation et des secteurs
  this.site.delegotion = '';
  this.filteredSecteurs = [];
  console.log("filteredDelegations", this.filteredDelegations);  // Ajout pour vérifier les résultats
}

onDelegationChange(delegationId: any) {
  console.log("Selected delegationId: ", delegationId);  // Vérifier la valeur de delegationId
  console.log("Secteurs disponibles: ", this.secteurs);  // Voir les secteurs disponibles

  this.filteredSecteurs = this.secteurs.filter((sec: any) => sec.delegation_id == delegationId);  // Utilise == au lieu de === pour éviter les problèmes de type

  console.log("Secteurs filtrés: ", this.filteredSecteurs);  // Vérifie les secteurs filtrés
  this.site.secteur = '';  // Réinitialiser la sélection des secteurs
}


  getFournisseurs() {
    this.service.getFournisseurs().subscribe((data: any) => {
      this.fournisseurs = data;
    });
  }
}

