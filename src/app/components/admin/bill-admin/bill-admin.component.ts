import { Component } from '@angular/core';
import { BillService } from '../../../bill.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bill-admin',
  templateUrl: './bill-admin.component.html',
  styleUrl: './bill-admin.component.css',
})
export class BillAdminComponent {
  billId: any = null;

  constructor(private route: ActivatedRoute, private bill: BillService) {
    this.route.params.subscribe((params) => {
      this.billId = params['id'];
    });
  }
  // ngOnInit() {
  //   this.Render();
  // }
  // async Render() {
  //   this.detailBill = await this.bill.GetBillDetail(this.billId);
  //   this.detailBill[0].product.forEach((pro: any) => {
  //     this.totalBill +=
  //       (pro.price_product -
  //         (pro.price_product *
  //           (pro.discount_product ? pro.discount_product : 0)) /
  //           100) *
  //       pro.amount_product;
  //   });
  //   console.log(this.detailBill);
  // }
}
