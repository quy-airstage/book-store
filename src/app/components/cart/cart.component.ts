import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  ViewChild,
} from '@angular/core';
import { CartService } from './cart.service';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(
    private cartService: CartService,
    private _http: HttpClient,
    private auth: AuthService,
    private user: UserService,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  listPro: any;
  listProCartArr: any[] = [];
  totalPrice: number = 0;
  userForm!: FormGroup;
  userInfo: any;
  userGet: any;
  alert = {
    status: false,
    color: '',
    mess: '',
  };
  async ngOnInit() {
    this.userForm = new FormGroup({
      id: new FormControl(),
      email: new FormControl(),
      full_name: new FormControl(),
      location: new FormControl(),
      phone: new FormControl(),
    });
    this.userInfo = this.auth.getUserInfo();
    if (!this.userInfo?.userId) {
      this.alert = {
        status: false,
        color: 'text-red-500',
        mess: `Vui lòng đăng nhập để mua hàng `,
      };
    }
    this.Render();
  }
  async Render() {
    this.listProCartArr = [];
    this.listPro = this.cartService.getCart();
    for (const id in this.listPro) {
      if (this.listPro[id]) {
        let res = await fetch(`http://localhost:3000/products/${id}`);
        let infoPro = await res.json();
        this.listProCartArr.push({
          info: infoPro,
          amount: this.listPro[id].quantity,
        });
        console.log(this.listProCartArr);
      }
    }
    if (this.userInfo?.userId) {
      this.userGet = await this.user.getUserWithId(this.userInfo?.userId);

      this.userForm.patchValue({
        id: this.userGet.id,
        email: this.userGet.email,
        full_name: this.userGet.full_name,
        location: this.userGet.location,
        phone: this.userGet.phone,
      });
      this.cd.detectChanges();
    }
  }
  updateCart() {
    const updatedValue = this.cartService.getTotalAmount();
    this.cartService.updateCart(updatedValue);
  }
  ChangeAmount(amount: number, id: string) {
    this.cartService.addToCart(id, amount);
    this.Render();
    this.updateCart();
  }

  handleTotal() {
    let total = 0;
    this.listProCartArr.forEach((pro, i) => {
      total +=
        pro.amount *
        (pro.info.price -
          (pro.info.price * pro.info.discount ? pro.info.discount : 0 / 100));
    });
    this.totalPrice = total;
    return total;
  }
  removeItemInCart(id: any) {
    let idRemove = String(id);
    this.cartService.removeFromCart(idRemove);
    this.updateCart();
    this.zone.run(() => {
      this.Render();
      console.log('re');
      this.cd.detectChanges();
    });
  }
  async onSubmit() {
    console.log(1);
    console.log(this.userForm.value);

    if (
      this.userForm.get('id')?.value &&
      this.userForm.get('email')?.value &&
      this.userForm.get('full_name')?.value &&
      this.userForm.get('phone')?.value &&
      this.userForm.get('location')?.value &&
      this.cartService.getTotalAmount() > 0
    ) {
      try {
        console.log(2);

        let result = await this.cartService.payment(this.userForm.value);
        this.alert = {
          status: result.status,
          color: result.status ? 'text-green-500' : 'text-red-500',
          mess: result.mess,
        };
        console.log(3);
      } catch (error) {
        this.alert = {
          status: false,
          color: 'text-red-500',
          mess: 'Lỗi server!',
        };
      }
      console.log(4);

      this.zone.run(() => {
        this.Render();
        console.log('re');
        this.cd.detectChanges();
      });
    }
    console.log(5);

    return false;
  }
}
