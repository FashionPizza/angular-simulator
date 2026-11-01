import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { IAuth, IAuthUser } from './i-auth';

const ACCESS_TOKEN_KEY = 'auth-access-token';
const REFRESH_TOKEN_KEY = 'auth-refresh-token';

interface IRefreshResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://dummyjson.com/auth';

  public readonly user = signal<IAuthUser | null>(null);
  public readonly isAuthenticated = computed(() => this.user() !== null);

  public get accessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  public get refreshTokenValue(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public login(data: { username: string; password: string }): Observable<IAuth> {
    return this.http
      .post<IAuth>(`${this.baseUrl}/login`, {
        username: data.username,
        password: data.password,
        expiresInMins: 60,
      })
      .pipe(tap((response) => this.setSession(response)));
  }

  public refresh(refreshToken: string): Observable<IRefreshResponse> {
    return this.http
      .post<IRefreshResponse>(`${this.baseUrl}/refresh`, {
        refreshToken,
        expiresInMins: 60,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
          localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
        }),
      );
  }

  public init(): Observable<IAuthUser | null> {
    const token = this.accessToken;

    if (!token) {
      this.user.set(null);
      return of(null);
    }

    return this.http.get<IAuthUser>(`${this.baseUrl}/me`).pipe(
      tap((user) => this.user.set(user)),
      catchError(() => {
        this.logout();
        return of(null);
      }),
    );
  }

  public logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    this.user.set(null);
  }

  private setSession(auth: IAuth): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, auth.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, auth.refreshToken);
    this.user.set({
      id: auth.id,
      username: auth.username,
      email: auth.email,
      firstName: auth.firstName,
      lastName: auth.lastName,
      gender: auth.gender,
      image: auth.image,
    });
  }
}