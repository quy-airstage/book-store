import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private auth: AuthService, private user: UserService) {}
  status = [
    { status: 0, name: 'Đang xử lý' },
    { status: 1, name: 'Đang vận chuyển' },
    { status: 2, name: 'Đã nhận' },
    { status: 3, name: 'Đã hủy' },
  ];
  billSubject = new BehaviorSubject<any>(null);
  bill$ = this.billSubject.asObservable();
  async UnapprovedBill() {
    let alert = {
      status: false,
      mess: 'Bạn không đủ quyền hạn.',
    };
    let check = this.auth.isAdmin();
    if (!check) {
      return alert;
    }
    let total;
    total = await fetch(`http://localhost:3000/bill/?status=0`)
      .then((res) => res.json())
      .then((result) => {
        return result.length;
      });
    return total;
  }
  getStatus(status: any) {
    return this.status[status];
  }
  async GetBillUser() {
    let user;
    user = await this.auth.getUserInfo();
    let bill;
    bill = await fetch(`http://localhost:3000/bill/?id_user=${user.userId}`)
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
    return bill;
  }
  async GetBillAdminFollowStatus(idSta: any) {
    let check = this.auth.isAdmin();
    if (!check) {
      return;
    }
    let status = this.getStatus(idSta);
    let bill;
    bill = await fetch(`http://localhost:3000/bill/?status=${status.status}`)
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
    return bill;
  }
  async GetBillUserFollowStatus(idSta: any) {
    let user;
    let status = this.getStatus(idSta);
    user = await this.auth.getUserInfo();
    let bill;
    bill = await fetch(
      `http://localhost:3000/bill/?id_user=${user.userId}&status=${status.status}`
    )
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
    return bill;
  }
  async GetBillDetail(idBill: any) {
    let user;
    user = await this.auth.getUserInfo();
    let bill;
    bill = await fetch(
      `http://localhost:3000/bill/?id_user=${user.userId}&id=${idBill}`
    )
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
    return bill;
  }
  async GetBillDetailAdmin(idBill: any) {
    let alert = {
      status: false,
      mess: 'Bạn không đủ quyền hạn.',
    };
    let check = this.auth.isAdmin();
    if (!check) {
      return alert;
    }

    let bill;
    bill = await fetch(`http://localhost:3000/bill/?id=${idBill}`)
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
    return bill;
  }
  async updateStatus(control: any, id: any) {
    let alert = {
      status: false,
      mess: 'Thất bại.',
    };
    let user;
    user = await this.auth.getUserInfo();
    let form = {
      status: this.status[control.status].status,
      note: control.note || this.status[control.status].name,
    };
    await fetch(`http://localhost:3000/bill?id_user=${user.userId}&id=${id}`, {
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
        this.billSubject.next(this.UnapprovedBill());
        alert = {
          status: true,
          mess: 'Cập nhật trạng thái thành công.',
        };
      })
      .catch((err) => {
        alert = {
          status: false,
          mess: 'Cập nhật trạng thái thất bại.',
        };
      });
    return alert;
  }
  async ChangeStatus(control: any, id: any) {
    let alert = {
      status: false,
      mess: 'Bạn không đủ quyền hạn.',
    };
    let check = this.auth.isAdmin();
    if (!check) {
      return alert;
    }
    let form = {
      status: this.status[control.status].status,
      note: control.note || this.status[control.status].name,
    };
    await fetch(`http://localhost:3000/bill/${id}`, {
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
        alert = {
          status: true,
          mess: 'Cập nhật trạng thái thành công.',
        };
        this.billSubject.next(this.UnapprovedBill());
      })
      .catch((err) => {
        alert = {
          status: false,
          mess: 'Cập nhật trạng thái thất bại.',
        };
      });
    return alert;
  }
}
