import { Component, Input } from '@angular/core';
import { IProduct } from '../../interfaces/i-product';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() infoProduct: any;
  constructor(private cartService: CartService) {}
  updateCart() {
    const updatedValue = this.cartService.getTotalAmount();
    this.cartService.updateCart(updatedValue);
  }
  addToCart(id: string, amount: number): void {
    this.cartService.addToCart(id, amount);
    this.updateCart();
  }
}
