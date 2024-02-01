import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillService } from '../../../../bill.service';

@Component({
  selector: 'app-detail-user-bill',
  templateUrl: './detail-user-bill.component.html',
  styleUrl: './detail-user-bill.component.css',
})
export class DetailUserBillComponent {
  billId: any = null;
  detailBill: any = [];
  totalBill = 0;
  note: any;
  alert = {
    status: false,
    color: '',
    mess: '',
  };
  constructor(
    private route: ActivatedRoute,
    private bill: BillService,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) {
    this.route.params.subscribe((params) => {
      this.billId = params['id'];
    });
  }
  ngOnInit() {
    this.Render();
  }
  async Render() {
    this.detailBill = await this.bill.GetBillDetailAdmin(this.billId);
    this.totalBill = 0;
    this.detailBill[0].product.forEach((pro: any) => {
      this.totalBill +=
        (pro.price_product -
          (pro.price_product *
            (pro.discount_product ? pro.discount_product : 0)) /
            100) *
        pro.amount_product;
    });
    console.log(this.detailBill);
  }
  async ConfirmBill() {
    let form = {
      status: this.detailBill[0].status + 1,
      note: this.note,
    };

    let result = await this.bill.ChangeStatus(form, this.billId);
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
