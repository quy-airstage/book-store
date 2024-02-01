import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../auth.service';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent {
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
      email: new FormControl(),
      full_name: new FormControl(),
      location: new FormControl(),
      phone: new FormControl(),
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
      email: this.userGet.email,
      full_name: this.userGet.full_name,
      location: this.userGet.location,
      phone: this.userGet.phone,
    });
  }
  async onSubmit() {
    console.log(1);
    console.log(this.userForm.value);

    if (this.userForm.get('id')?.value && this.userForm.get('email')?.value) {
      try {
        console.log(2);

        let result = await this.user.updateUser(this.userForm.value);
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
