import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import {
  Product,
  ProductService,
} from '../../../shared/service/product/product.service';

import { AuthService } from '../../../shared/service/auth/auth.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  errorMessage = '';

  user: any = null;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();

    console.log('Logged-in user:', this.user);

    console.log('User permissions:', this.user?.permissions);

    this.getProducts();
  }

  getProducts(): void {
    this.errorMessage = '';

    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },

      error: (error) => {
        console.error('Get products error:', error);

        this.errorMessage = 'Unable to load products.';
      },
    });
  }

  canView(): boolean {
    return this.authService.hasPermission('view products');
  }

  viewProduct(id: number): void {
    if (!this.canView()) {
      this.router.navigate(['/access-denied']);

      return;
    }

    this.router.navigate(['/product', id]);
  }


  canEdit(): boolean {
    return this.authService.hasPermission('update products');
  }

  editProduct(id: number): void {
    if (!this.canEdit()) {
      this.router.navigate(['/access-denied']);

      return;
    }

    this.router.navigate(['/edit', id]);
  }

  canDelete(): boolean {
    return this.authService.hasPermission('delete products');
  }

  deleteProduct(id: number): void {
    if (!this.canDelete()) {
      this.router.navigate(['/access-denied']);

      return;
    }

    const confirmed = confirm('Are you sure you want to delete this product?');

    if (!confirmed) {
      return;
    }

    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        console.log('Product deleted:', response);

        this.products = this.products.filter((product) => product.id !== id);
      },

      error: (error) => {
        console.error('Delete product error:', error);

        this.errorMessage =
          error?.error?.message || 'Unable to delete product.';
      },
    });
  }

  can(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }
}
