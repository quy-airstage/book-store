import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true; // Allow navigation if the user is logged in
    } else {
      this.router.navigate(['home']);
      return false; // Block navigation if the user is not logged in
    }
  }
}
