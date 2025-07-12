import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const ROLE_KEY = 'auth-role';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  signOut(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }

  public saveToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  public getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  public saveUser(user: any, role:any): void {
    if (this.isBrowser()) {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(ROLE_KEY);
      localStorage.setItem(USER_KEY, user);
      localStorage.setItem(ROLE_KEY, role);
    }
  }

  public getUser(): any {
    if (this.isBrowser()) {
      const user = localStorage.getItem(USER_KEY);
      if (user) {
        try {
          return user;
        } catch {
          return null;
        }
      }
    }
    return null;
  }

   public getUserRole(): any {
    if (this.isBrowser()) {
      const role = localStorage.getItem(ROLE_KEY);
      if (role) {
        try {
          return role;
        } catch {
          return null;
        }
      }
    }
    return null;
  }
}
