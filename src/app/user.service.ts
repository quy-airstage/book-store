import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient, private router: Router) {}
  async getUserWithId(id: any) {
    let user;
    user = await fetch(`http://localhost:3000/user/${id}`)
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
    return user;
  }
  async updateUser(control: any) {
    let check = {
      status: false,
      mess: '',
    };
    let form = {
      email: control.email,
      full_name: control.full_name,
      location: control.location,
      phone: control.phone,
    };

    await fetch(`http://localhost:3000/user/${control.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        check = {
          status: true,
          mess: 'Chỉnh sửa thành công.',
        };
      })
      .catch((err) => {
        check = {
          status: false,
          mess: 'Chỉnh sửa thất bại.',
        };
      });
    return check;
  }
  async updatePassword(control: any) {
    let check = {
      status: false,
      mess: '',
    };
    let form = {
      password: control.pass1,
    };

    await fetch(`http://localhost:3000/user/${control.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        check = {
          status: true,
          mess: 'Cập nhật thành công.',
        };
      })
      .catch((err) => {
        check = {
          status: false,
          mess: 'Cập nhật thất bại.',
        };
      });
    return check;
  }
  async RecoveryPassword(token: any, control: any) {
    let check = {
      status: false,
      mess: '',
    };
    if (!(!!token && !this.jwtHelper.isTokenExpired(token))) {
      return (check = {
        status: false,
        mess: 'Đường dẫn hết hạn!',
      });
    }
    const user = this.jwtHelper.decodeToken(token);
    let form = {
      password: control.pass1,
    };

    await fetch(`http://localhost:3000/user/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        check = {
          status: true,
          mess: 'Đổi mật khẩu thành công.',
        };
      })
      .catch((err) => {
        check = {
          status: false,
          mess: 'Đổi mật khẩu thất bại.',
        };
      });
    return check;
  }
  async getUser(email: any) {
    let user;
    user = await fetch(`http://localhost:3000/user?email=${email}`)
      .then((res) => res.json())
      .then((result) => {
        return result[0];
      });
    return user;
  }
  async signup(registerForm: any) {
    let form = {
      email: registerForm.email,
      password: registerForm.pass1,
      role: 1,
    };
    let check = {
      status: false,
      mess: 'Đăng ký thất bại!',
    };
    let user = await this.getUser(registerForm.email);
    let emailExist = false;

    if (user.length > 0) {
      emailExist = true;
    } else {
      emailExist = false;
    }

    if (emailExist) {
      check = {
        status: false,
        mess: 'Email đã đăng kí',
      };
      return check;
    } else
      try {
        this.http
          .post(`http://localhost:3000/user`, form)
          .subscribe((response: any) => {});
        check = {
          status: true,
          mess: 'Đăng ký thành công!',
        };
      } catch (error) {
        console.log(error);

        check = {
          status: false,
          mess: 'Đăng ký thất bại!',
        };
      }

    return check;
  }
}
