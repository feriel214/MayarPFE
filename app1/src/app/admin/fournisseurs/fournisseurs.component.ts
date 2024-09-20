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
    // Vérification si les champs de newFournisseur sont vides
    if (!this.newFournisseur.codeFourn || !this.newFournisseur.nomFournisseur) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs du fournisseur avant de soumettre.',
        confirmButtonText: 'OK'
      });
      return; // Arrête la fonction si les champs sont vides
    }
  
    this.fournisseurService.addFournisseur(this.newFournisseur).subscribe(
      (fournisseur: Fournisseur) => {
        // Ajouter le fournisseur à la liste et réinitialiser le formulaire
        this.fournisseurs.push(fournisseur);
        this.newFournisseur = { codeFourn: '', nomFournisseur: '' };
        this.getFournisseurs();
  
        // Afficher un message de succès
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Fournisseur ajouté avec succès !",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du fournisseur', error);
  
        // Afficher une notification d'erreur
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Une erreur s'est produite lors de l'ajout du fournisseur. Veuillez réessayer.",
          confirmButtonText: 'OK'
        });
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
