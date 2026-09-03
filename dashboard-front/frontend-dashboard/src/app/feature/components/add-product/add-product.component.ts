import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ProductService } from '../../../shared/service/product/product.service';
import {
  CategoriesService,
  Category,
} from '../../../shared/service/categories/categories.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
  categories: Category[] = [];

  loading = false;
  loadingCategories = false;

  errorMessage = '';
  successMessage = '';

  newProduct = {
    name: '',
    price: 0,
    stock: 0,
    status: 'active',
    category_id: 0,
    image: '',
    sub_images: [] as string[],
  };

  constructor(
    private productService: ProductService,
    private categoriesService: CategoriesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loadingCategories = true;
    this.errorMessage = '';

    this.categoriesService.getCategories('en').subscribe({
      next: (response) => {
        console.log('Categories:', response);

        this.categories = response.data;

        this.loadingCategories = false;
      },

      error: (error) => {
        console.error('Categories error:', error);

        this.errorMessage = 'Failed to load categories';
        this.loadingCategories = false;
      },
    });
  }

  addSubImage(): void {
    this.newProduct.sub_images.push('');
  }

  removeSubImage(index: number): void {
    this.newProduct.sub_images.splice(index, 1);
  }

  addProduct(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.newProduct.name.trim()) {
      this.errorMessage = 'Product name is required';
      return;
    }

    // Category
    if (!this.newProduct.category_id) {
      this.errorMessage = 'Please select a category';
      return;
    }

    // Price
    if (this.newProduct.price < 0) {
      this.errorMessage = 'Price cannot be negative';
      return;
    }

    // Stock
    if (this.newProduct.stock < 0) {
      this.errorMessage = 'Stock cannot be negative';
      return;
    }

    // Main Image URL
    if (!this.newProduct.image.trim()) {
      this.errorMessage = 'Image URL is required';
      return;
    }

    // Remove empty sub-image inputs
    const subImages = this.newProduct.sub_images
      .map((image) => image.trim())
      .filter((image) => image !== '');

    this.loading = true;

    this.productService
      .addProduct({
        name: this.newProduct.name,
        price: this.newProduct.price,
        stock: this.newProduct.stock,
        status: this.newProduct.status,
        category_id: this.newProduct.category_id,
        image: this.newProduct.image,
        sub_images: subImages,
      })
      .subscribe({
        next: (response) => {
          console.log('Product added:', response);

          this.loading = false;

          this.successMessage = 'Product added successfully';

          // Reset form
          this.newProduct = {
            name: '',
            price: 0,
            stock: 0,
            status: 'active',
            category_id: 0,
            image: '',
            sub_images: [],
          };

          setTimeout(() => {
            this.router.navigate(['/product']);
          }, 1000);
        },

        error: (error) => {
          console.error('Add product error:', error);

          this.loading = false;

          this.errorMessage = error.error?.message || 'Failed to add product';
        },
      });
  }
}
