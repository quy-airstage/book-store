import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css',
})
export class ListProductComponent {
  constructor(private _http: HttpClient) {}
  listPro: any;
  ngOnInit(): void {
    this._http
      .get(
        'http://localhost:3000/products?hot=1&_sort=view&_order=view&_limit=4'
      )
      .subscribe((data) => {
        this.listPro = data;
      });
  }
}
