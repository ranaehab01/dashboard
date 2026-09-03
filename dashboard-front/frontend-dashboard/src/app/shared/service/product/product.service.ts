import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProductCategory {
  id: number;

  name: {
    ar: string;
    en: string;
  };

  description: {
    ar: string;
    en: string;
  };

  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  category_id: number;
  image: string | null;
  name: string;
  price: string;
  stock: number;
  status: string;
  created_at: string;
  updated_at: string;
  category?: ProductCategory;
  sub_images: ProductImage[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products`, {
      headers: this.getHeaders(),
    });
  }

  getProduct(id: string | number): Observable<{ data: Product }> {
    return this.http.get<{ data: Product }>(`${this.apiUrl}/products/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addProduct(product: {
    name: string;
    price: number;
    stock: number;
    status: string;
    category_id: number;
    image: string;
    sub_images?: string[];
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/products`, product, {
      headers: this.getHeaders(),
    });
  }

  updateProduct(
    id: number,
    product: {
      name?: string;
      price?: number;
      stock?: number;
      status?: string;
      category_id?: number;
      image?: string | null;
      sub_images?: string[];
    },
  ): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/products/${id}`, product, {
      headers: this.getHeaders(),
    });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/products/${id}`, {
      headers: this.getHeaders(),
    });
  }

  deleteProductImage(imageId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/product-images/${imageId}`, {
      headers: this.getHeaders(),
    });
  }
}
