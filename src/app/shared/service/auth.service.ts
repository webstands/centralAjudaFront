import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userScope: string | null = null;

  constructor(private http: HttpClient) {
    this.loadUserScopeFromToken();
  }

  async login(authenticator: any): Promise<boolean> {
    const result = await this.http.post<any>(`${environment.api}/login`, authenticator).toPromise();
    if (result && result.token) {
      window.localStorage.setItem('token', result.token);

      // Decodificar o token e definir o escopo do usuário
      const decodedToken: any = jwt_decode(result.token);
      if (decodedToken && decodedToken.scope) {
        this.setUserScope(decodedToken.scope);
      }

      return true;
    }

    return false;
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }

  getTokenExpirationDate(token: string): any {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn(): boolean {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }

  setUserScope(scope: string) {
    this.userScope = scope;
  }

  getUserScope(): string | null {
    return this.userScope;
  }

  public loadUserScopeFromToken() {
    const token = this.getAuthorizationToken();
    if (token) {
      const decodedToken: any = jwt_decode(token);
      if (decodedToken && decodedToken.scope) {
        this.setUserScope(decodedToken.scope);
      }
    }
  }
}
