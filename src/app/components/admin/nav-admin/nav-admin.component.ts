import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { BillService } from '../../../bill.service';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrl: './nav-admin.component.css',
})
export class NavAdminComponent {
  constructor(
    private bill: BillService,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) {}
  totalBill: any = [];

  ngOnInit() {
    this.Render();
    this.bill.bill$.subscribe(async (totalBill: any) => {
      this.totalBill = await totalBill;
      this.zone.run(() => {
        this.cd.detectChanges();
      });
    });
  }
  async Render() {
    this.totalBill = await this.bill.UnapprovedBill();
  }
}
