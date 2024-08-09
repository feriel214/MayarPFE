import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service'; // Assurez-vous que le chemin est correct
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  onLogin(): void {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      const loginData = {
        email: formValues.email,
        password: formValues.password
      };

      this.apiService.connexion(loginData).subscribe(
        (response: any) => {
          console.log('login response:', response);
          if (response.connex) {
            // Save the user object to local storage
            localStorage.setItem('user', JSON.stringify(response.utilisateur));

            if (response.utilisateur.profil === 'user') {
              Swal.fire({
                title: 'Votre Compte pas encore activé !',
                text: 'Essayer ultérieurement',
                icon: 'warning',
              });
            } else if (response.utilisateur.profil === 'directeur') {
              this.router.navigate(['/admin/list/users']);
            } else if (response.utilisateur.profil === 'manager') {
              this.router.navigate(['/manager/tbsite']);
            } else if (response.utilisateur.profil === 'ingénieur') {
              this.router.navigate(['/ingRadio/list/sites']);
            } else if (response.utilisateur.profil === 'financier') {
              this.router.navigate(['/financier/tbsite']);
            }
          }
        },
        (error: any) => {
          let errorMessage = 'Une erreur est survenue.';

          if (error.error && error.error.error) {
            errorMessage = error.error.error;
          }

          Swal.fire({
            title: 'Erreur',
            text: errorMessage,
            icon: 'error',
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Formulaire invalide',
        text: 'Veuillez vérifier les informations fournies.',
        icon: 'warning',
      });
    }
  }
  // onLogin(): void {
  //   if (this.loginForm.valid) {
  //     const formValues = this.loginForm.value;
  //     const loginData = {
  //       email: formValues.email,
  //       password: formValues.password
  //     };

  //     this.apiService.connexion(loginData).subscribe(
  //       (response: any) => {
  //         console.log('login response : ',response)
  //         if(response.connex){
  //           if(response.utilisateur.profil=='user'){
  //             Swal.fire({
  //               title: 'Votre Compte pas encore activé !',
  //               text: 'Essayer ulterieuremnt',
  //               icon: 'success',
  //             });
  //           //admin
  //           }else if(response.utilisateur.profil=='directeur'){
  //              this.router.navigate(['/admin/list/users']);
  //           }
  //           //Manager
  //           else if(response.utilisateur.profil=='manager'){
  //             this.router.navigate(['/manager/tbsite']);
  //           }

  //           //ing Radio
  //           else if(response.utilisateur.profil=='ingénieur'){
  //             this.router.navigate(['/ingRadio/list/sites']);

  //           //financier
  //           } else if(response.utilisateur.profil=='financier'){
  //             this.router.navigate(['/ingRadio/tbsite']);
  //           }
  //         }
  //       },
  //       (error: any) => {
  //         let errorMessage = 'Une erreur est survenue.';

  //         if (error.error && error.error.error) {
  //           errorMessage = error.error.error;
  //         }

  //         Swal.fire({
  //           title: 'Erreur',
  //           text: errorMessage,
  //           icon: 'error',
  //         });
  //       }
  //     );
  //   } else {
  //     Swal.fire({
  //       title: 'Formulaire invalide',
  //       text: 'Veuillez vérifier les informations fournies.',
  //       icon: 'warning',
  //     });
  //   }
  // }
}
