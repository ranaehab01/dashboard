import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  Role,
  RoleService
} from '../../../shared/service/role/role.service';

import {
  AuthService
} from '../../../shared/service/auth/auth.service';


@Component({
  selector: 'app-role-permission',

  standalone: true,

  imports: [
    RouterLink
  ],

  templateUrl: './role-permission.component.html',

  styleUrl: './role-permission.component.scss'
})
export class RolePermissionComponent {

  constructor(
    private roleService: RoleService,
    private authService: AuthService
  ) {}


  // =====================================================
  // ROLES
  // =====================================================

  roles: Role[] = [];


  // =====================================================
  // LOADING
  // =====================================================

  loading = false;


  // =====================================================
  // ERROR
  // =====================================================

  errorMessage = '';


  // =====================================================
  // CURRENT OPEN ROLE
  // =====================================================

  expandedRoleId: number | null = null;


  // =====================================================
  // PERMISSION GROUPS
  // =====================================================

  permissionGroups = [

    {
      name: 'Products',
      resource: 'products'
    },

    {
      name: 'Categories',
      resource: 'categories'
    },

    {
      name: 'Users',
      resource: 'users'
    },

    {
      name: 'Roles',
      resource: 'roles'
    }

  ];


  // =====================================================
  // ACTIONS
  // =====================================================

  actions = [

    'create',
    'view',
    'update',
    'delete'

  ];


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.loadRoles();

  }


  // =====================================================
  // CHECK USER PERMISSION
  // =====================================================

  can(permission: string): boolean {

    return this.authService.hasPermission(permission);

  }


  // =====================================================
  // LOAD ROLES
  // =====================================================

  loadRoles(): void {

    // User needs view roles
    // to load/view roles.

    if (!this.can('view roles')) {

      this.errorMessage =
        'You do not have permission to view roles.';

      return;

    }


    this.loading = true;

    this.errorMessage = '';


    this.roleService
      .getRoles()
      .subscribe({

        // =================================================
        // SUCCESS
        // =================================================

        next: (response) => {

          console.log(
            'Roles:',
            response
          );


          this.roles =
            response.data;


          this.loading = false;

        },


        // =================================================
        // ERROR
        // =================================================

        error: (error) => {

          console.log(
            'Load roles error:',
            error
          );


          this.errorMessage =
            'Failed to load roles';


          this.loading = false;

        }

      });

  }


  // =====================================================
  // OPEN / CLOSE ROLE
  // =====================================================

  toggleRole(role: Role): void {

    // User needs view roles
    // to open role details.

    if (!this.can('view roles')) {

      return;

    }


    // If already open -> close

    if (
      this.expandedRoleId === role.id
    ) {

      this.expandedRoleId = null;

    }


    // Otherwise -> open

    else {

      this.expandedRoleId = role.id;

    }

  }


  // =====================================================
  // CHECK IF ROLE IS OPEN
  // =====================================================

  isRoleExpanded(role: Role): boolean {

    return this.expandedRoleId === role.id;

  }


  // =====================================================
  // CHECK ROLE PERMISSION
  // =====================================================

  hasPermission(
    role: Role,
    action: string,
    resource: string
  ): boolean {

    const permission =
      `${action} ${resource}`;


    return role.permissions.some(
      item =>
        item.name === permission
    );

  }


  // =====================================================
  // TOGGLE PERMISSION
  // =====================================================

  togglePermission(
    role: Role,
    action: string,
    resource: string,
    event: Event
  ): void {

    // Only update roles users
    // can change permissions.

    if (!this.can('update roles')) {

      return;

    }


    const checkbox =
      event.target as HTMLInputElement;


    const permission =
      `${action} ${resource}`;


    // =================================================
    // CHECK
    // =================================================

    if (checkbox.checked) {

      const exists =
        role.permissions.some(
          item =>
            item.name === permission
        );


      if (!exists) {

        role.permissions.push({

          id: 0,

          name: permission

        });

      }

    }


    // =================================================
    // UNCHECK
    // =================================================

    else {

      role.permissions =
        role.permissions.filter(
          item =>
            item.name !== permission
        );

    }


    console.log(
      'Role:',
      role.name
    );


    console.log(
      'Permissions:',
      role.permissions
    );


    // Save immediately

    this.savePermissions(role);

  }


  // =====================================================
  // SAVE PERMISSIONS
  // =====================================================

  savePermissions(role: Role): void {

    // Only update roles users
    // can save permission changes.

    if (!this.can('update roles')) {

      return;

    }


    // Convert permission objects
    // into permission names.

    const permissions =
      role.permissions.map(
        permission =>
          permission.name
      );


    console.log(
      'Sending permissions:',
      permissions
    );


    this.roleService
      .updateRole(

        role.id,

        {
          name: role.name,

          permissions: permissions

        }

      )
      .subscribe({

        // =================================================
        // SUCCESS
        // =================================================

        next: (response) => {

          console.log(
            'Permission updated successfully:',
            response
          );

        },


        // =================================================
        // ERROR
        // =================================================

        error: (error) => {

          console.log(
            'Permission update failed:',
            error
          );


          this.errorMessage =
            'Failed to update permissions';


          // Restore original database data

          this.loadRoles();

        }

      });

  }


  // =====================================================
  // DELETE ROLE
  // =====================================================

  deleteRole(role: Role): void {

    // Only delete roles users
    // can delete.

    if (!this.can('delete roles')) {

      return;

    }


    const confirmed = confirm(

      `Are you sure you want to delete "${role.name}"?`

    );


    // User cancelled

    if (!confirmed) {

      return;

    }


    // =================================================
    // DELETE
    // =================================================

    this.roleService
      .deleteRole(role.id)
      .subscribe({

        // =================================================
        // SUCCESS
        // =================================================

        next: (response) => {

          console.log(
            'Role deleted:',
            response
          );


          // Remove role from UI

          this.roles =
            this.roles.filter(
              item =>
                item.id !== role.id
            );


          // Close role if it was open

          if (
            this.expandedRoleId === role.id
          ) {

            this.expandedRoleId = null;

          }

        },


        // =================================================
        // ERROR
        // =================================================

        error: (error) => {

          console.log(
            'Delete role error:',
            error
          );


          this.errorMessage =
            'Failed to delete role';

        }

      });

  }

}