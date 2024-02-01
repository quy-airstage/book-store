import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bill-user',
  templateUrl: './bill-user.component.html',
  styleUrl: './bill-user.component.css',
})
export class BillUserComponent {
  billId: any = null;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.billId = params['id'];
    });
  }
}
