import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Permission {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
  guard_name: string;
  permissions: Permission[];
}

export interface CreateRole {
  name: string;
  permissions: string[];
}

export interface UpdateRole {
  name: string;
  permissions?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getRoles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/roles`, {
      headers: this.getHeaders(),
    });
  }

  getRole(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/roles/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createRole(role: CreateRole): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/roles`, role, {
      headers: this.getHeaders(),
    });
  }

  updateRole(id: number, role: UpdateRole): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/roles/${id}`, role, {
      headers: this.getHeaders(),
    });
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/roles/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
