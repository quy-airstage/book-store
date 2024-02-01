import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  constructor(private authService: AuthService, public router: Router) {}
  userData = {
    email: '',
    password: '',
  };
  async onSubmit() {
    console.log(this.userData);
    if (this.userData.email !== '' && this.userData.password !== '') {
      await this.onLogin(this.userData);
      console.log('login: success ' + this.authService.isLoggedIn());
    }
  }
  onClick() {
    console.log(1);
  }

  async onLogin(formData: any) {
    await this.authService.login(formData.email, formData.password);
  }
  ngOnInit(): void {
    console.log('login:' + this.authService.isLoggedIn());
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['user']);
    }
  }
}
