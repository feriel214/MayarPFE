import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  newUser: User = new User();

  selectedFile: File | null = null;
  editUserData: any = {};
  originalUserData: any = {};
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        console.log("#########data",data)
        this.users = data.data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  addAccount(): void {
   
      console.log(" this.newUser.profil", this.newUser)
      this.userService.inscription(this.newUser).subscribe(
        (response) => {
          Swal.fire('Success', 'User added successfully!', 'success');
          this.loadUsers();
        },
        (error) => {
          console.error('Error adding user:', error);
          Swal.fire('Error', 'Error adding user', 'error');
        }
      );
   
  }




  getBadgeClass(profil: string): string {
    switch (profil) {
      case 'user':
        return 'badge badge-danger';
      case 'ingenieur':
        return 'badge badge-primary';
      case 'directeur':
        return 'badge badge-warning';
      case 'manager':
        return 'badge badge-success';
      case 'financier':
        return 'badge badge-info';
      default:
        return '';
    }
  }
  blockUser(userId:any): void {
    this.userService.blockUser(userId).subscribe(
      response => {
        Swal.fire({
          title: 'Utilisateur bloqué avec succès ! ',
          text: 'succès',
          icon: 'warning',
        });
        
        this.loadUsers()
      },
      error => {
        console.error('Erreur lors du blocage de l\'utilisateur', error);
        // Handle error response
      }
    );
  }

  editUser(user: any): void {
    this.editUserData = { ...user };
    this.originalUserData = { ...user }; // Save the original data
  }

  onEditUser(): void {
    const updateData: any = {};

    // Only include fields that have been changed
    if (this.editUserData.nom !== this.originalUserData.nom) {
      updateData.nom = this.editUserData.nom;
    }
    if (this.editUserData.prenom !== this.originalUserData.prenom) {
      updateData.prenom = this.editUserData.prenom;
    }
    if (this.editUserData.email !== this.originalUserData.email) {
      updateData.email = this.editUserData.email;
    }
    if (this.editUserData.profil !== this.originalUserData.profil) {
      updateData.profil = this.editUserData.profil;
    }
    if (this.editUserData.password) {
      updateData.password = this.editUserData.password;
    }

    this.userService.edition(this.editUserData.id, updateData).subscribe(
      response => {
        Swal.fire({
          title: 'Succès',
          text: 'Utilisateur modifié avec succès!',
          icon: 'success',
        }).then(() => {
          this.loadUsers();
          this.editUserData = {};
          this.originalUserData = {};
        });
      },
      error => {
        Swal.fire({
          title: 'Erreur',
          text: error.error.message || 'Erreur lors de la modification de l\'utilisateur',
          icon: 'error',
        });
      }
    );
  }
  deleteUser(id:any){
   
  }

}
