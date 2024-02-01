import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css',
})
export class DetailProductComponent {
  constructor(
    private route: ActivatedRoute,
    private _http: HttpClient,
    private cartService: CartService
  ) {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
    });
  }
  amount: number = 1;
  detailProduct: any;
  productId: any;
  check: string = 'hidden';
  ngOnInit(): void {
    this._http
      .get(`http://localhost:3000/products/${this.productId}`)
      .subscribe((data) => {
        this.detailProduct = data;
      });
  }
  CheckAmountChange(newValue: number) {
    newValue < 1 ? (this.check = '') : (this.check = 'hidden');
  }

  ChangeAmount(num: number) {
    if (this.amount <= 1 && num == -1) {
      return;
    }
    this.amount += num;
  }
  updateCart() {
    const updatedValue = this.cartService.getTotalAmount();
    this.cartService.updateCart(updatedValue);
  }
  addToCart(id: string): void {
    let amount = this.amount;
    if (amount < 1) {
      this.check = '';
      return;
    }
    this.cartService.addToCart(id, amount);
    this.updateCart();
  }
}
