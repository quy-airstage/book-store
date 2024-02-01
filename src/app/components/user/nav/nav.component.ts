import { Component } from '@angular/core';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  constructor(private auth: AuthService) {}
  user = false;
  ngOnInit() {
    this.user = this.auth.isAdmin();
    console.log(this.user);
  }
  logout() {
    this.auth.logout();
  }
}
