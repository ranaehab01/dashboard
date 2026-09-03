import { Routes } from '@angular/router';

import { LoginComponent } from './shared/components/login/login.component';

import { RegisterComponent } from './feature/components/register/register.component';

import { ProductComponent } from './feature/components/product/product.component';

import { ProductDetailsComponent } from './feature/components/product-details/product-details.component';

import { CategoriesComponent } from './feature/components/categories/categories.component';

import { UsersComponent } from './feature/components/users/users.component';

import { AddCategoryComponent } from './feature/components/add-category/add-category.component';

import { AddProductComponent } from './feature/components/add-product/add-product.component';

import { EditProductComponent } from './feature/components/edit-product/edit-product.component';

import { EditCategoryComponent } from './feature/components/edit-category/edit-category.component';

import { AddUserComponent } from './feature/components/add-user/add-user.component';

import { EditUserComponent } from './feature/components/edit-user/edit-user.component';

import { RolePermissionComponent } from './feature/components/role-permission/role-permission.component';

import { RolePermissionEditComponent } from './feature/components/role-permission-edit/role-permission-edit.component';

import { RolePermissionAddComponent } from './feature/components/role-permission-add/role-permission-add.component';

import { authGuard } from './guard/auth/auth.guard';

import { adminRoleGuard } from './guard/admin-role/admin-role.guard';

import { permissionGuard } from './guard/permission/permission.guard';

import { AccessDeniedComponent } from './shared/components/access-denied/access-denied.component';

import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'product',
    component: ProductComponent,
    canActivate: [authGuard, permissionGuard('view products')],
  },

  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    canActivate: [authGuard, permissionGuard('view products')],
  },

  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [authGuard],
  },

  {
    path: 'users',
    component: UsersComponent,
  },

  {
    path: 'add-category',
    component: AddCategoryComponent,
    canMatch: [adminRoleGuard],
  },

  {
    path: 'add-product',
    component: AddProductComponent,
    canMatch: [adminRoleGuard],
  },

  {
    path: 'edit/:id',
    component: EditProductComponent,
    canActivate: [authGuard],
  },

  {
    path: 'edit-category/:id',
    component: EditCategoryComponent,
    canActivate: [authGuard],
  },

  {
    path: 'add-user',
    component: AddUserComponent,
    canMatch: [adminRoleGuard],
  },

  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    canActivate: [authGuard],
  },

  {
    path: 'roles',
    component: RolePermissionComponent,
    canActivate: [authGuard, permissionGuard('view roles')],
  },

  {
    path: 'roles/add',
    component: RolePermissionAddComponent,
    canActivate: [authGuard, permissionGuard('create roles')],
  },

  {
    path: 'roles/edit/:id',
    component: RolePermissionEditComponent,
    canActivate: [authGuard, permissionGuard('update roles')],
  },

  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },

  {
    path: 'not-found',
    component: NotFoundComponent,
  },

  {
    path: '**',
    redirectTo: 'not-found',
  },
];
