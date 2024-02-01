import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  alert = {
    mess: '',
    color: '',
    status: false,
  };
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
      ]),
      pass1: new FormControl('', [Validators.required]),
      pass2: new FormControl('', [Validators.required]),
    });
  }
  async onSubmit() {
    if (
      this.registerForm.get('email')?.hasError('pattern') &&
      this.registerForm.get('email')?.value
    ) {
      return false;
    }
    if (
      this.registerForm.get('email')?.value &&
      this.registerForm.get('pass1')?.value &&
      this.registerForm.get('pass2')?.value &&
      this.registerForm.get('pass2')?.value ==
        this.registerForm.get('pass1')?.value
    ) {
      let signup = this.registerForm.value;
      let result;
      result = await this.userService.signup(signup);
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
