import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import {
  UsersService,
  Role,
} from '../../../shared/service/users/users.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
  roles: Role[] = [];

  loading = false;

  loadingRoles = false;

  errorMessage = '';

  successMessage = '';

  newUser = {
    name: '',
    email: '',
    password: '',
    type: 'staff',
    role: '',
  };

  constructor(
    private usersService: UsersService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  // Load roles from Laravel
  loadRoles(): void {
    this.loadingRoles = true;

    this.errorMessage = '';

    this.usersService.getRoles().subscribe({
      next: (response) => {
        console.log('Roles:', response);

        this.roles = response.data;

        this.loadingRoles = false;
      },

      error: (error) => {
        console.error('Roles error:', error);

        this.errorMessage = error.error?.message || 'Failed to load roles';

        this.loadingRoles = false;
      },
    });
  }

  // Add user
  addUser(): void {
    this.errorMessage = '';

    this.successMessage = '';

    // Name validation
    if (!this.newUser.name.trim()) {
      this.errorMessage = 'User name is required';

      return;
    }

    // Email validation
    if (!this.newUser.email.trim()) {
      this.errorMessage = 'Email is required';

      return;
    }

    // Password validation
    if (!this.newUser.password.trim()) {
      this.errorMessage = 'Password is required';

      return;
    }

    // Role validation
    if (!this.newUser.role) {
      this.errorMessage = 'Please select a role';

      return;
    }

    this.loading = true;

    this.usersService
      .addUser({
        name: this.newUser.name,

        email: this.newUser.email,

        password: this.newUser.password,

        type: this.newUser.type,

        role: this.newUser.role,
      })
      .subscribe({
        next: (response) => {
          console.log('User added:', response);

          this.loading = false;

          this.successMessage = 'User added successfully';

          // Reset form
          this.newUser = {
            name: '',

            email: '',

            password: '',

            type: 'staff',

            role: '',
          };

          // Go back to users page
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 1000);
        },

        error: (error) => {
          console.error('Add user error:', error);

          this.loading = false;

          this.errorMessage = error.error?.message || 'Failed to add user';
        },
      });
  }
}
