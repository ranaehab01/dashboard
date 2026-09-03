import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  user: string;
  email: string;
  type: string;
  status: string;
  created_at: string;
}

export interface UsersResponse {
  success: boolean;
  data: User[];
}

export interface Role {
  id: number;
  name: string;
}

export interface RolesResponse {
  success: boolean;
  data: Role[];
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${this.apiUrl}/users`, {
      headers: this.getHeaders(),
    });
  }

  getRoles(): Observable<RolesResponse> {
    return this.http.get<RolesResponse>(`${this.apiUrl}/roles`, {
      headers: this.getHeaders(),
    });
  }

  addUser(user: {
    name: string;
    email: string;
    password: string;
    type: string;
    role: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user, {
      headers: this.getHeaders(),
    });
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`, {
      headers: this.getHeaders(),
    });
  }

  updateUser(
    id: number,
    user: {
      name: string;
      email: string;
      password?: string;
      type: string;
      status: string;
      role: string;
    },
  ): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${id}`, user, {
      headers: this.getHeaders(),
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
