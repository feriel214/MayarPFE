import { Component, OnInit } from '@angular/core';
import { Secteur } from '../../models/secteur.model';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-secteurs',
  templateUrl: './secteurs.component.html',
  styleUrls: ['./secteurs.component.css']
})
export class SecteursComponent implements OnInit {
  secteurs: Secteur[] = [];
  newSecteur: Secteur = { codeSec: '', libelleSec: '', delegation_id: 0 };
  editSecteurData: any = {
    codeSec: null,
    libelleSec: null,
    delegation_id: null
  };
  delegations: any[] = [];

  constructor(private secteurService: AdminService) { }

  ngOnInit(): void {
    this.getSecteurs();
    this.loadDelegations();
  }

  // Fetch all secteurs
  getSecteurs(): void {
    this.secteurService.getSecteurs().subscribe(
      (data: Secteur[]) => {
        this.secteurs = data;
      },
      (error) => {
        console.error('Error fetching secteurs', error);
      }
    );
  }

  // Load all delegations for the dropdown
  loadDelegations(): void {
    this.secteurService.getAllDelegations().subscribe((res: any) => {
      this.delegations = res;
    });
  }

  // Fetch the name of the delegation by ID
  getDelegationName(delegation_id: number): string {
    const delegation = this.delegations.find(d => d.idDel === delegation_id);
    return delegation ? delegation.libelleDel : '';
  }

  // Add a new secteur
  addSecteur(): void {
    this.secteurService.createSecteur(this.newSecteur).subscribe(
      (secteur: Secteur) => {
        // Ajouter le nouveau secteur à la liste et réinitialiser le formulaire
        this.secteurs.push(secteur);
        this.newSecteur = { codeSec: '', libelleSec: '', delegation_id: 0 };
        this.getSecteurs();
        
        // Afficher une notification de succès
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Secteur ajouté avec succès !",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du secteur', error);
        
        // Afficher une notification d'erreur
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Une erreur s'est produite lors de l'ajout du secteur. Veuillez réessayer.",
          confirmButtonText: 'OK'
        });
      }
    );
  }
  

  // Set the data for the secteur to be edited
  editSecteur(secteur: Secteur): void {
    this.editSecteurData = { ...secteur };
  }

  // Update an existing secteur
  updateSecteur(): void {
    if (this.editSecteurData) {
      this.secteurService.updateSecteur(this.editSecteurData.idSecteur!, this.editSecteurData).subscribe(
        (updatedSecteur: Secteur) => {
          const index = this.secteurs.findIndex(s => s.idSecteur === updatedSecteur.idSecteur);
          if (index !== -1) {
            this.secteurs[index] = updatedSecteur;
          }
          this.editSecteurData = null;
          this.getSecteurs();
          this.showSuccessMessage('Secteur mis à jour avec succès!');
        },
        (error) => {
          console.error('Error updating secteur', error);
        }
      );
    }
  }

  // Delete a secteur by ID
  deleteSecteurById(id: number): void {
    if (id !== undefined && id !== null) {
      Swal.fire({
          title: 'Êtes-vous sûr?',
          text: 'Cette action est irréversible!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Oui, supprimer!',
          cancelButtonText: 'Annuler'
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.secteurService.deleteSecteur(id).subscribe(
              () => {
                this.secteurs = this.secteurs.filter(s => s.idSecteur !== id);
                this.getSecteurs();
                this.showSuccessMessage('Secteur supprimé avec succès!');
              },
              (error) => {
                console.error('Error deleting secteur', error);
              }
            );
          }
        });
    }
  }

  // Show success message with SweetAlert2
  showSuccessMessage(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Succès!',
      text: message,
      timer: 2000, // Automatically close after 2 seconds
      showConfirmButton: false
    });
  }

 
}