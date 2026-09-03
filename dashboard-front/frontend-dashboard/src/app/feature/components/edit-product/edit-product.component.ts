import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ProductService } from '../../../shared/service/product/product.service';

import {
  CategoriesService,
  Category,
} from '../../../shared/service/categories/categories.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,

  imports: [CommonModule, FormsModule, RouterLink],

  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export class EditProductComponent implements OnInit {
  productId!: number;

  categories: Category[] = [];

  errorMessage = '';

  successMessage = '';

  product = {
    name: '',
    price: 0,
    stock: 0,
    status: 'active',
    category_id: 0,
    image: '',
  };

  subImages: {
    id: number;
    product_id: number;
    image: string;
    created_at: string;
    updated_at: string;
  }[] = [];

  newSubImages: string[] = [];

  newSubImageUrl = '';

  constructor(
    private route: ActivatedRoute,

    private router: Router,

    private productService: ProductService,

    private categoriesService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.productId) {
      this.errorMessage = 'Invalid product ID';

      return;
    }

    this.loadCategories();

    this.loadProduct();
  }

  loadCategories(): void {
    this.categoriesService.getCategories('en').subscribe({
      next: (response) => {
        this.categories = response.data;
      },

      error: (error) => {
        console.error('Categories error:', error);

        this.errorMessage = 'Unable to load categories.';
      },
    });
  }

  loadProduct(): void {
    this.productService.getProduct(this.productId).subscribe({
      next: (response) => {
        const data = response.data;

        this.product = {
          name: data.name || '',

          price: Number(data.price) || 0,

          stock: Number(data.stock) || 0,

          status: data.status || 'active',

          category_id: Number(data.category_id) || 0,

          image: data.image || '',
        };

        this.subImages = data.sub_images || [];

        this.newSubImages = [];

        this.newSubImageUrl = '';
      },

      error: (error) => {
        console.error('Product error:', error);

        this.errorMessage = 'Unable to load product.';
      },
    });
  }

  addSubImage(): void {
    const url = this.newSubImageUrl.trim();

    if (!url) {
      return;
    }

    this.newSubImages.push(url);

    this.newSubImageUrl = '';
  }

  removeNewSubImage(index: number): void {
    this.newSubImages.splice(index, 1);
  }

  deleteSubImage(imageId: number, index: number): void {
    this.productService.deleteProductImage(imageId).subscribe({
      next: () => {
        this.subImages.splice(index, 1);
      },

      error: (error) => {
        console.error('Delete sub image error:', error);

        this.errorMessage = 'Unable to delete sub image.';
      },
    });
  }

  updateProduct(): void {
    this.errorMessage = '';

    this.successMessage = '';

    if (!this.product.name.trim()) {
      this.errorMessage = 'Product name is required';

      return;
    }

    if (!this.product.category_id) {
      this.errorMessage = 'Please select a category';

      return;
    }

    if (this.product.price < 0) {
      this.errorMessage = 'Price cannot be negative';

      return;
    }

    if (this.product.stock < 0) {
      this.errorMessage = 'Stock cannot be negative';

      return;
    }

    if (!this.product.image.trim()) {
      this.errorMessage = 'Image URL is required';

      return;
    }

    this.productService
      .updateProduct(
        this.productId,

        {
          name: this.product.name,

          price: this.product.price,

          stock: this.product.stock,

          status: this.product.status,

          category_id: this.product.category_id,

          image: this.product.image,

          sub_images: this.newSubImages,
        },
      )
      .subscribe({
        next: (response) => {
          console.log('Product updated:', response);

          this.successMessage = 'Product updated successfully.';

          setTimeout(() => {
            this.router.navigate(['/product']);
          }, 1000);
        },

        error: (error) => {
          console.error('Update product error:', error);

          this.errorMessage =
            error?.error?.message || 'Unable to update product.';
        },
      });
  }
}
