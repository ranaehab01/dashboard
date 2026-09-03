import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  UsersService,
  User,
} from '../../../shared/service/users/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  loading = false;
  errorMessage = '';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.loading = true;
    this.errorMessage = '';

    this.usersService.getUsers().subscribe({
      next: (response) => {
        this.users = response.data;

        this.loading = false;
      },

      error: (error) => {
        console.error('Users error:', error);

        this.errorMessage = 'Unable to load users.';

        this.loading = false;
      },
    });
  }
  deleteUser(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this user?');

    if (!confirmed) {
      return;
    }

    this.usersService.deleteUser(id).subscribe({
      next: (response) => {
        this.users = this.users.filter((user) => user.id !== id);
      },

      error: (error) => {
        console.error('Delete user error:', error);

        alert('Failed to delete user');
      },
    });
  }
}
