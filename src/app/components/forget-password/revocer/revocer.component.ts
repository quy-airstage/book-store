import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-revocer',
  templateUrl: './revocer.component.html',
  styleUrl: './revocer.component.css',
})
export class RevocerComponent {
  registerForm!: FormGroup;
  alert = {
    mess: '',
    color: '',
    status: false,
  };
  token: any;
  constructor(private route: ActivatedRoute, private user: UserService) {
    this.route.params.subscribe((params) => {
      this.token = params['token'];
    });
  }
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      pass1: new FormControl('', [Validators.required]),
      pass2: new FormControl('', [Validators.required]),
    });
  }
  async onSubmit() {
    if (
      this.registerForm.get('pass1')?.value &&
      this.registerForm.get('pass2')?.value &&
      this.registerForm.get('pass2')?.value ==
        this.registerForm.get('pass1')?.value
    ) {
      let form = this.registerForm.value;
      let result = await this.user.RecoveryPassword(this.token, form);
      console.log(result);

      if (result.status) {
        this.alert.mess = result.mess;
        this.alert.color = 'text-green-500';
        this.alert.status = true;
      } else {
        this.alert.mess = result.mess;
        this.alert.color = 'text-red-500';
        this.alert.status = true;
      }
    }
    return false;
  }
}
