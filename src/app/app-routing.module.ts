import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { CartComponent } from './components/cart/cart.component';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { RegisterComponent } from './components/register/register.component';
import { RoleGuardService } from './role-guard.service';
import { AuthGuardService } from './auth-guard.service';
import { DashBoardComponent } from './components/user/dash-board/dash-board.component';
import { DashBoardAdminComponent } from './components/admin/dash-board-admin/dash-board-admin.component';
import { ProductAdminComponent } from './components/admin/product-admin/product-admin.component';
import { CategoryAdminComponent } from './components/admin/category-admin/category-admin.component';
import { EditCategoryComponent } from './components/admin/category-admin/edit-category/edit-category.component';
import { EditProductComponent } from './components/admin/product-admin/edit-product/edit-product.component';
import { AddProductComponent } from './components/admin/product-admin/add-product/add-product.component';
import { EditPasswordComponent } from './components/user/edit-password/edit-password.component';
import { BillUserComponent } from './components/user/bill-user/bill-user.component';
import { BillAdminComponent } from './components/admin/bill-admin/bill-admin.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { RevocerComponent } from './components/forget-password/revocer/revocer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'shop',
    children: [
      { path: '', component: ShopComponent },
      { path: ':id', component: DetailProductComponent },
    ],
  },
  {
    path: 'products/:id',
    children: [
      { path: '', component: DetailProductComponent },
      { path: 'detail', component: DetailProductComponent },
    ],
  },
  { path: 'cart', component: CartComponent },
  {
    path: 'login',

    children: [
      { path: '', component: FormComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'reset-password', component: ForgetPasswordComponent },
      { path: 'reset-password/:token', component: RevocerComponent },
    ],
  },
  {
    path: 'user',
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: DashBoardComponent },
      { path: 'bills', component: BillUserComponent },
      { path: 'bills/:id', component: BillUserComponent },
      { path: 'change-password', component: EditPasswordComponent },
    ],
  },
  {
    path: 'admin',
    canActivate: [RoleGuardService],
    children: [
      { path: '', component: DashBoardAdminComponent },
      { path: 'product', component: ProductAdminComponent },
      { path: 'product/add', component: AddProductComponent },
      { path: 'product/edit/:id', component: EditProductComponent },
      { path: 'category', component: CategoryAdminComponent },
      { path: 'category/edit/:id', component: EditCategoryComponent },
      { path: 'bills', component: BillAdminComponent },
      { path: 'bills/:id', component: BillAdminComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
