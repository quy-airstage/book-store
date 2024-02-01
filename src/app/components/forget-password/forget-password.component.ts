import { Component } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  userData = {
    email: '',
  };
  mess!: string;
  async onSubmit() {
    console.log(this.userData);
    if (this.userData.email !== '') {
      let form = {
        email: this.userData.email,
      };
      let resutl = await fetch('http://localhost:1210/forgot-password', {
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
          return result;
        });
      this.mess = resutl.message;
    }
  }
}
