import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { BillService } from '../../../../bill.service';

@Component({
  selector: 'app-list-bill-admin',
  templateUrl: './list-bill-admin.component.html',
  styleUrl: './list-bill-admin.component.css',
})
export class ListBillAdminComponent {
  constructor(
    private bill: BillService,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) {}
  listBill: any = [];
  statusGet: any = {
    status: 0,
    name: 'Đang xử lý',
  };
  alert = {
    status: false,
    color: '',
    mess: '',
  };
  listStatus: any;
  ngOnInit() {
    this.listStatus = this.bill.status;
    this.Render();
  }
  async Render() {
    this.listBill = await this.bill.GetBillAdminFollowStatus(
      this.statusGet.status
    );
    console.log(1);
    console.log(this.listBill);
    console.log(this.listBill.length);
  }
  GetBillsWithStatus(infoSta: any) {
    this.statusGet = infoSta;
    this.Render();
  }
  async SubmitStatus(control: any, id: any) {
    let form = {
      status: control.status,
      note: control.note,
    };
    let result = await this.bill.ChangeStatus(form, id);
    this.alert = {
      status: result.status,
      color: result.status ? 'text-green-500' : 'text-red-500',
      mess: result.mess,
    };
    this.zone.run(() => {
      this.Render();
      console.log('re');
      this.cd.detectChanges();
    });
  }
}
