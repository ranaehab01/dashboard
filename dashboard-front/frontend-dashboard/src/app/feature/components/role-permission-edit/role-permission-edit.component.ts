import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { Role, RoleService } from '../../../shared/service/role/role.service';

@Component({
  selector: 'app-role-permission-edit',

  standalone: true,

  imports: [ReactiveFormsModule],

  templateUrl: './role-permission-edit.component.html',

  styleUrl: './role-permission-edit.component.scss',
})
export class RolePermissionEditComponent implements OnInit {
  roleForm: FormGroup;

  roleId!: number;

  role: Role | null = null;

  loading = false;

  saving = false;

  errorMessage = '';

  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    this.roleId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadRole();
  }

  loadRole(): void {
    this.loading = true;

    this.errorMessage = '';

    this.roleService.getRole(this.roleId).subscribe({
      next: (response) => {
        this.role = response.data;

        this.roleForm.patchValue({
          name: this.role?.name,
        });

        this.loading = false;
      },

      error: (error) => {
        console.log(error);

        this.errorMessage = 'Failed to load role';

        this.loading = false;
      },
    });
  }

  updateRole(): void {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();

      return;
    }

    this.saving = true;

    this.errorMessage = '';

    this.successMessage = '';

    const name = this.roleForm.value.name;

    this.roleService
      .updateRole(
        this.roleId,

        {
          name: name,
        },
      )
      .subscribe({
        next: (response) => {
          console.log('Role updated:', response);

          this.saving = false;

          this.successMessage = 'Role name updated successfully';

          setTimeout(() => {
            this.router.navigate(['/roles']);
          }, 700);
        },

        error: (error) => {
          console.log(error);

          this.saving = false;

          this.errorMessage = error?.error?.message || 'Failed to update role';
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/roles']);
  }
}
