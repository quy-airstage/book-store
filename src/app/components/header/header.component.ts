import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private cartService: CartService,
    private auth: AuthService,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) {}
  totalCart: number = 0;
  cartSubscription: any;
  user: any;
  Render() {
    this.totalCart = this.getCart();
  }
  ngOnInit() {
    this.Render();
    this.cartSubscription = this.cartService.cartUpdated$.subscribe(
      (updatedValue: number) => {
        this.totalCart = updatedValue;
        this.zone.run(() => {
          this.cd.detectChanges();
        });
      }
    );
    this.auth.user$.subscribe((user: any) => {
      console.log(user);

      this.user = user;
      this.zone.run(() => {
        this.cd.detectChanges();
      });
    });
    let check = this.auth.isLoggedIn();
    if (check) {
      this.user = this.auth.getUserInfo();
    }
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  getCart(): any {
    return this.cartService.getTotalAmount();
  }
}
