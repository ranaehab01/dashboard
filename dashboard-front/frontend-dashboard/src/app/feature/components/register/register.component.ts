import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../../shared/service/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;

  loading = false;

  errorMessage = '';

  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],

      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register(): void {
    this.errorMessage = '';

    this.successMessage = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();

      return;
    }

    const formData = this.registerForm.value;

    console.log('Register data:', formData);

    this.loading = true;

    this.authService
      .register({
        name: formData.name,

        email: formData.email,

        password: formData.password,
      })
      .subscribe({
        next: (response) => {
          console.log('Register response:', response);

          this.loading = false;

          this.successMessage = response.message || 'Registration successful.';

          this.registerForm.reset();

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        },

        error: (error: HttpErrorResponse) => {
          console.error('Register error:', error);

          this.loading = false;

          if (error.status === 422 && error.error?.errors) {
            const errors = error.error.errors;

            const firstError = Object.values(errors)[0];

            if (Array.isArray(firstError) && firstError.length > 0) {
              this.errorMessage = firstError[0] as string;

              return;
            }
          }

          // Laravel normal error message

          this.errorMessage = error.error?.message || 'Registration failed.';
        },
      });
  }
}
