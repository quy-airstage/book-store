import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillService } from '../../../../bill.service';

@Component({
  selector: 'app-detail-bill',
  templateUrl: './detail-bill.component.html',
  styleUrl: './detail-bill.component.css',
})
export class DetailBillComponent {
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
    this.detailBill = await this.bill.GetBillDetail(this.billId);
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

    let result = await this.bill.updateStatus(form, this.billId);
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
