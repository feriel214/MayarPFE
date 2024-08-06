import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../../models/fournisseur.model';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.css']
})
export class FournisseursComponent implements OnInit {
  avatars=[
    'f1.png','f2.png','f3.png','f4.png','f5.png','f6.png','f7.png'
  ]
  faEdit = faEdit;
  faTrash = faTrash;
  fournisseurs: Fournisseur[] = [];
  newFournisseur: Fournisseur = { codeFourn: '', nomFournisseur: '' };
  editFournisseurData: Fournisseur | null = null;
 
  constructor(private fournisseurService: AdminService) { 
   
  }

  ngOnInit(): void {
    this.getFournisseurs();
  }

  // Fetch all fournisseurs
  getFournisseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe(
      (data: Fournisseur[]) => {
        console.log("***Fournisseureus",data)
        this.fournisseurs = data;
      },
      (error) => {
        console.error('Error fetching fournisseurs', error);
      }
    );
  }

  // Add a new fournisseur
  addFournisseur(): void {
    this.fournisseurService.addFournisseur(this.newFournisseur).subscribe(
      (fournisseur: Fournisseur) => {
        this.fournisseurs.push(fournisseur);
        this.newFournisseur = { codeFourn: '', nomFournisseur: '' };
        this.getFournisseurs();
        this.showSuccessMessage('Fournisseur ajouté avec succès!');
      },
      (error) => {
        console.error('Error adding fournisseur', error);
      }
    );
  }

  // Set the data for the fournisseur to be edited
  editFournisseur(fournisseur: Fournisseur): void {
    this.editFournisseurData = { ...fournisseur };
  }

  // Update an existing fournisseur
  updateFournisseur(): void {
    
    console.log("edit Fourn",this.editFournisseurData)
    if (this.editFournisseurData) {
      let body={
        "codeFourn": this.editFournisseurData.codeFourn,
        "nomFournisseur": this.editFournisseurData.nomFournisseur
      }
      this.fournisseurService.updateFournisseur(this.editFournisseurData.idFourn!, body).subscribe(
        (updatedFournisseur: Fournisseur) => {
          const index = this.fournisseurs.findIndex(f => f.idFourn === updatedFournisseur.idFourn);
          if (index !== -1) {
            this.fournisseurs[index] = updatedFournisseur;
          }
          this.editFournisseurData = null;
          this.getFournisseurs();
          this.showSuccessMessage('Fournisseur mis à jour avec succès!');
        },
        (error) => {
          console.error('Error updating fournisseur', error);
        }
      );
    }
  }

  // Delete a fournisseur by ID
  deleteFournisseurById(id: number): void {
    if (id !== undefined && id !== null) {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Cette action est irréversible!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          this.fournisseurService.deleteFournisseur(id).subscribe(
            () => {
              this.fournisseurs = this.fournisseurs.filter(f => f.idFourn !== id);
              this.getFournisseurs();
              this.showSuccessMessage('Fournisseur supprimé avec succès!');
            },
            (error) => {
              console.error('Error deleting fournisseur', error);
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


  getRandomAvatar(): string {
    const randomIndex = Math.floor(Math.random() * this.avatars.length);
    return this.avatars[randomIndex];
  }
}
