import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  category: string;
  description: string;
  products: number;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  deleteCategory(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<any>(`${this.apiUrl}/categories/${id}`, {
      headers,
    });
  }

  addCategory(category: {
    name: {
      en: string;
      ar: string;
    };
    description: {
      en: string;
      ar: string;
    };
  }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.apiUrl}/categories`, category, {
      headers,
    });
  }

  getCategory(id: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Accept-Language': 'en',
    });

    return this.http.get<any>(`${this.apiUrl}/categories/${id}`, { headers });
  }

  updateCategory(
    id: number,
    category: {
      name?: {
        ar: string;
        en: string;
      };
      description?: {
        ar: string;
        en: string;
      };
    },
  ): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.put<any>(`${this.apiUrl}/categories/${id}`, category, {
      headers,
    });
  }

  getCategories(language: 'en' | 'ar'): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Accept-Language': language,
    });

    return this.http.get<any>(`${this.apiUrl}/categories`, { headers });
  }
}
