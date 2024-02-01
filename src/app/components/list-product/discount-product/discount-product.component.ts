import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-discount-product',
  templateUrl: './discount-product.component.html',
  styleUrl: './discount-product.component.css',
})
export class DiscountProductComponent {
  constructor(private _http: HttpClient) {}
  listPro: any;
  ngOnInit(): void {
    this._http
      .get('http://localhost:3000/products?_sort=discount&_order=desc&_limit=4')
      .subscribe((data) => {
        this.listPro = data;
      });
  }
}
