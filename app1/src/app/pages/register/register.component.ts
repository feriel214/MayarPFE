import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service'; // Assurez-vous que le chemin est correct
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_repeat: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: this.matchingFields('password', 'password_repeat') });
  }

  matchingFields(passwordKey: string, passwordRepeatKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const passwordRepeat = group.controls[passwordRepeatKey];

      if (password.value !== passwordRepeat.value) {
        passwordRepeat.setErrors({ mismatch: true });
      } else {
        passwordRepeat.setErrors(null);
      }
    };
  }

  onSignUp(): void {
    if (this.signUpForm.valid) {
      const formValues = this.signUpForm.value;
      const signUpData = {
        nom: formValues.nom,
        prenom: formValues.prenom,
        email: formValues.email,
        password: formValues.password,
      };

      this.apiService.inscription(signUpData).subscribe(
        (response: any) => {
          Swal.fire({
            title: 'Succès',
            text: 'Inscription réussie !',
            icon: 'success',
          }).then(() => {
            this.router.navigate(['/login']);
          });
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
}
