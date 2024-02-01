import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { UserService } from '../../../user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.css',
})
export class EditPasswordComponent {
  userForm!: FormGroup;
  userInfo: any;
  userGet: any;
  alert = {
    status: false,
    color: '',
    mess: '',
  };
  constructor(
    private auth: AuthService,
    private user: UserService,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) {}
  async ngOnInit() {
    this.userForm = new FormGroup({
      id: new FormControl(),
      pass_curent: new FormControl(),
      pass1: new FormControl(),
      pass2: new FormControl(),
    });
    this.userInfo = this.auth.getUserInfo();
    this.Render();
  }
  async Render() {
    console.log(this.userInfo);
    // userId
    this.userGet = await this.user.getUserWithId(this.userInfo.userId);

    this.userForm.patchValue({
      id: this.userGet.id,
    });
  }
  async onSubmit() {
    console.log(1);
    console.log(this.userForm.value);
    this.alert = {
      status: false,
      color: 'text-red-500',
      mess: 'Vui lòng nhập đầy đủ!',
    };
    if (
      this.userForm.get('id')?.value &&
      this.userForm.get('pass_curent')?.value &&
      this.userForm.get('pass1')?.value &&
      this.userForm.get('pass1')?.value == this.userForm.get('pass2')?.value
    ) {
      try {
        if (this.userForm.get('pass_curent')?.value != this.userGet.password) {
          this.alert = {
            status: false,
            color: 'text-red-500',
            mess: 'Sai mật khẩu!',
          };
          return false;
        }
        console.log(2);

        let result = await this.user.updatePassword(this.userForm.value);
        this.alert = {
          status: result.status,
          color: result.status ? 'text-green-500' : 'text-red-500',
          mess: result.mess,
        };
        console.log(3);
      } catch (error) {
        this.alert = {
          status: false,
          color: 'text-red-500',
          mess: 'Lỗi server!',
        };
      }
      console.log(4);

      this.zone.run(() => {
        this.Render();
        console.log('re');
        this.cd.detectChanges();
      });
    }
    console.log(5);

    return false;
  }
}
