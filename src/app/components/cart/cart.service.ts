import { ChangeDetectorRef, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { BillService } from '../../bill.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProduct: any = {};
  testt: boolean = false;
  amountItemCart: number = 0;
  constructor(private cookieService: CookieService, private bill: BillService) {
    this.amountItemCart = this.getTotalAmount();
  }
  private cartUpdateSource = new Subject<number>();

  cartUpdated$ = this.cartUpdateSource.asObservable();

  updateCart(updatedValue: number) {
    this.cartUpdateSource.next(updatedValue);
  }

  private initializeCartData(): void {
    const cookieData = this.cookieService.get('cartProduct');
    if (cookieData) {
      this.cartProduct = JSON.parse(cookieData);
    }
  }

  private saveCartData(): void {
    this.cookieService.set('cartProduct', JSON.stringify(this.cartProduct));
  }

  addToCart(id: string, amount: number): void {
    this.initializeCartData();
    if (this.cartProduct[id]) {
      this.cartProduct[id].quantity += amount;
    } else {
      this.cartProduct[id] = { id, quantity: amount };
    }
    this.saveCartData();
    if (this.cartProduct[id].quantity <= 0) {
      this.removeFromCart(id);
    }
    this.testt = true;

    console.log(this.cookieService.get('cartProduct'));
  }

  removeFromCart(id: string): void {
    this.initializeCartData();
    if (this.cartProduct[id]) {
      delete this.cartProduct[id];
      this.saveCartData();
    }
  }

  getCart(): any {
    this.initializeCartData();
    return this.cartProduct;
  }

  async getProduct(id: any) {
    let product;
    product = await fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
    return product;
  }
  getTotalAmount(): number {
    this.initializeCartData();
    let totalAmount = 0;
    for (const id in this.cartProduct) {
      if (this.cartProduct[id]) {
        totalAmount += this.cartProduct[id].quantity;
      }
    }
    return totalAmount;
  }
  async payment(control: any) {
    let check = {
      status: false,
      mess: '',
    };
    if (this.getTotalAmount() < 1) {
      check = {
        status: false,
        mess: 'Bạn chưa thêm sản phẩm nào vào giỏ.',
      };
    }

    interface FormData {
      id_user: any;
      email: any;
      full_name: any;
      location: any;
      phone: any;
      create_at: any;
      note: any;
      status: any;
      payment: any;
      product: {
        id_product: any;
        name_product: any;
        price_product: any;
        discount_product: any;
        img_product: any;
        amount_product: any;
      }[];
    }
    let time = new Date();

    let form: FormData = {
      id_user: control.id,
      email: control.email,
      full_name: control.full_name,
      location: control.location,
      phone: control.phone,
      note: 'Đang xử lý',
      create_at: time.getTime(),
      status: 0,
      payment: control.pay || 'Thanh toán khi nhận hàng.',
      product: [],
    };
    this.initializeCartData();
    let listProPay: any = [];
    for (const id in this.cartProduct) {
      if (this.cartProduct[id]) {
        let product = await this.getProduct(this.cartProduct[id].id);
        console.log(product);
        listProPay = [
          ...listProPay,
          {
            id: this.cartProduct[id].id,
            sold: product.sold + this.cartProduct[id].quantity,
          },
        ];
        form.product = [
          ...form.product,
          {
            id_product: product.id,
            name_product: product.name_product,
            price_product: product.price,
            discount_product: product.discount,
            img_product: product.img,
            amount_product: this.cartProduct[id].quantity,
          },
        ];
      }
    }

    await fetch(`http://localhost:3000/bill/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        listProPay.forEach(async (pro: any) => {
          await this.updateSold(pro);
        });
        this.cartProduct = {};
        this.saveCartData();
        this.updateCart(0);
        console.log('y');

        check = {
          status: true,
          mess: 'Đặt hàng thành công.',
        };
        this.bill.billSubject.next(this.bill.UnapprovedBill());
      })
      .catch((err) => {
        check = {
          status: false,
          mess: 'Đặt hàng thất bại.',
        };
      });
    return check;
  }
  async updateSold(control: any) {
    let form = {
      sold: control.sold,
    };

    await fetch(`http://localhost:3000/products/${control.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {})
      .catch((err) => {});
  }
}
