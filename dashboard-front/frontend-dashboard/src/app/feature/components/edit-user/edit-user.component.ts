import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import {
  UsersService,
  Role,
} from '../../../shared/service/users/users.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent implements OnInit {
  userId!: number;

  // Available roles
  roles: Role[] = [];

  loadingRoles = false;

  user = {
    name: '',
    email: '',
    password: '',
    type: '',
    status: '',
    role: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.userId) {
      alert('Invalid user ID');
      return;
    }

    this.loadRoles();

    this.loadUser();
  }

  loadRoles(): void {
    this.loadingRoles = true;

    this.usersService.getRoles().subscribe({
      next: (response) => {
        console.log('Roles:', response);

        this.roles = response.data;

        this.loadingRoles = false;
      },

      error: (error) => {
        console.error('Get roles error:', error);

        this.loadingRoles = false;

        alert('Failed to load roles');
      },
    });
  }

  loadUser(): void {
    this.usersService.getUser(this.userId).subscribe({
      next: (response) => {
        console.log('User:', response);

        const data = response.data;

        this.user = {
          name: data.name || '',
          email: data.email || '',
          password: '',
          type: data.type || '',
          status: data.status || '',
          role: data.role || '',
        };

        console.log('Selected role:', this.user.role);
      },

      error: (error) => {
        console.error('Get user error:', error);

        alert('Failed to load user');
      },
    });
  }

  updateUser(): void {
    if (!this.user.role) {
      alert('Please select a role');

      return;
    }

    this.usersService
      .updateUser(this.userId, {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        type: this.user.type,
        status: this.user.status,
        role: this.user.role,
      })
      .subscribe({
        next: (response) => {
          console.log('User updated:', response);

          this.router.navigate(['/users']);
        },

        error: (error) => {
          console.error('Update user error:', error);

          alert(error.error?.message || 'Failed to update user');
        },
      });
  }
}
