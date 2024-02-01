import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
// import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  private isAuthenticated = false;

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  token: string = '';
  private initializeToken(): void {
    const cookieData = this.cookieService.get('access_token');
    if (cookieData) {
      this.token = JSON.parse(cookieData);
    }
  }

  private saveToken(): void {
    this.cookieService.set('access_token', JSON.stringify(this.token));
  }
  async createToken(object: any) {
    let form = {
      id: object.id,
      email: object.email,
      role: object.role,
    };
    await fetch('http://localhost:1210/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result.token);
        this.token = result.token;
        this.saveToken();
      });

    // return jwt.sign(object, this.secretKey, { expiresIn: '1d' });
  }
  async login(email: string, password: string) {
    const user = {
      id: null,
      email: email,
      password: password,
      role: null,
    };
    let check = false;
    await fetch(
      `http://localhost:3000/user?email=${email}&password=${password}`
    )
      .then((res) => res.json())
      .then(async (result) => {
        if (result.length > 0) {
          check = true;
          user.role = result[0].role;
          user.id = result[0].id;
          await this.createToken(user);

          this.userSubject.next(this.getUserInfo());

          this.isAuthenticated = true;
          this.router.navigate(['/user']);
        }
      });

    return check;
  }

  async logout() {
    this.cookieService.delete('access_token');
    this.token = '';
    this.isAuthenticated = false;
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getUserInfo(): any {
    let result: any = null;
    try {
      this.initializeToken();
      let token = this.token;
      const decodedToken = this.jwtHelper.decodeToken(token);
      result = decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    return result;
  }

  isLoggedIn(): boolean {
    this.initializeToken();
    const token = this.token;
    console.log(token);

    let result: boolean = false;
    try {
      result = !!token && !this.jwtHelper.isTokenExpired(token);
    } catch {}
    if (result) {
      this.userSubject.next(this.getUserInfo());
    }
    return result;
  }
  isAdmin(): boolean {
    let checkLogin = this.isLoggedIn();

    if (checkLogin) {
      this.initializeToken();
      const token = this.token;
      const user = this.jwtHelper.decodeToken(token);
      try {
        console.log(user);

        return user.role == 2;
      } catch {
        return false;
      }
    }
    return false;
  }
}
