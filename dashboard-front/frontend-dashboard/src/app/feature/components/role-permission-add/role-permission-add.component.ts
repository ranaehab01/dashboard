import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RoleService } from '../../../shared/service/role/role.service';

@Component({
  selector: 'app-role-permission-add',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './role-permission-add.component.html',
  styleUrl: './role-permission-add.component.scss',
})
export class RolePermissionAddComponent {
  roleForm: any;

  loading = false;
  errorMessage = '';
  successMessage = '';

  permissionGroups = [
    {
      name: 'Products',
      resource: 'products',
    },
    {
      name: 'Categories',
      resource: 'categories',
    },
    {
      name: 'Users',
      resource: 'users',
    },
    {
      name: 'Roles',
      resource: 'roles',
    },
  ];

  actions = ['create', 'view', 'update', 'delete'];

  selectedPermissions: string[] = [];

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private router: Router,
  ) {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  hasPermission(action: string, resource: string): boolean {
    const permission = `${action} ${resource}`;

    return this.selectedPermissions.includes(permission);
  }

  togglePermission(action: string, resource: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;

    const permission = `${action} ${resource}`;

    if (checkbox.checked) {
      if (!this.selectedPermissions.includes(permission)) {
        this.selectedPermissions.push(permission);
      }
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(
        (item) => item !== permission,
      );
    }
  }

  createRole(): void {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();

      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const role = {
      name: this.roleForm.value.name,

      permissions: this.selectedPermissions,
    };

    this.roleService.createRole(role).subscribe({
      next: (response) => {
        this.loading = false;

        this.successMessage = response.message || 'Role created successfully.';

        setTimeout(() => {
          this.router.navigate(['/roles']);
        }, 1000);
      },

      error: (error) => {
        console.log(error);

        this.loading = false;

        this.errorMessage = error.error?.message || 'Failed to create role.';
      },
    });
  }
}
