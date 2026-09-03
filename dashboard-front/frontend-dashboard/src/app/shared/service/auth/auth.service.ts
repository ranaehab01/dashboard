import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  type: string;
  status: string;
  role: string | null;
  permissions: string[];
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string | null;
  user: AuthUser | null;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: AuthUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  register(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, user);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          console.log('FULL LOGIN RESPONSE:', response);

          if (response.success && response.token && response.user) {
            const user: AuthUser = {
              ...response.user,

              permissions: Array.isArray(response.user.permissions)
                ? response.user.permissions
                : [],
            };

            localStorage.setItem('token', response.token);

            localStorage.setItem('user', JSON.stringify(user));

            console.log('Logged-in user:', user);

            console.log('Role:', user.role);

            console.log('Permissions:', user.permissions);
          }
        }),
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): AuthUser | null {
    const user = localStorage.getItem('user');

    if (!user) {
      return null;
    }

    try {
      const parsedUser = JSON.parse(user);

      return {
        ...parsedUser,

        permissions: Array.isArray(parsedUser.permissions)
          ? parsedUser.permissions
          : [],
      } as AuthUser;
    } catch (error) {
      console.error('Invalid user data:', error);

      return null;
    }
  }

  getPermissions(): string[] {
    const user = this.getUser();

    return user?.permissions ?? [];
  }

  hasPermission(permission: string): boolean {
    return this.getPermissions().includes(permission);
  }

  getRole(): string | null {
    const user = this.getUser();

    return user?.role ?? null;
  }

  hasRole(role: string): boolean {
    return this.getRole() === role;
  }

  logout(): void {
    localStorage.removeItem('token');

    localStorage.removeItem('user');
  }
}
