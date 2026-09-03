import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Product,
  ProductService,
} from '../../../shared/service/product/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;

  loading = false;

  errorMessage = '';

  selectedImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    console.log('Product ID:', id);

    if (!id) {
      this.errorMessage = 'Product ID not found.';

      return;
    }

    this.getProduct(id);
  }

  getProduct(id: string): void {
    this.loading = true;

    this.errorMessage = '';

    this.productService.getProduct(id).subscribe({
      next: (response) => {
        console.log('FULL RESPONSE:', response);

        if (response && response.data) {
          this.product = response.data;

          this.selectedImage = this.product.image;
        } else {
          this.errorMessage = 'Product data was not found.';
        }

        this.loading = false;
      },

      error: (error) => {
        console.error('Product details API error:', error);

        this.errorMessage = 'Unable to load product.';

        this.loading = false;
      },
    });
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  goBack(): void {
    this.router.navigate(['/product']);
  }
}
