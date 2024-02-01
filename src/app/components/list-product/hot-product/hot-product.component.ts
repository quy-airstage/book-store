import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hot-product',
  templateUrl: './hot-product.component.html',
  styleUrl: './hot-product.component.css',
})
export class HotProductComponent {
  constructor(private _http: HttpClient) {}
  listPro: any;
  ngOnInit(): void {
    this._http
      .get(
        'http://localhost:3000/products?hot=1&_sort=view&_order=desc&_limit=4'
      )
      .subscribe((data) => {
        this.listPro = data;
      });
  }
}
