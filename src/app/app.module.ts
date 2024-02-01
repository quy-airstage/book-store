import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { ShopComponent } from './components/shop/shop.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { SearchComponent } from './components/shop/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { HotProductComponent } from './components/list-product/hot-product/hot-product.component';
import { DiscountProductComponent } from './components/list-product/discount-product/discount-product.component';
import { SellingProductComponent } from './components/list-product/selling-product/selling-product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartService } from './components/cart/cart.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControllButtonComponent } from './components/shop/controll-button/controll-button.component';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { DashBoardComponent } from './components/user/dash-board/dash-board.component';
import { InfoComponent } from './components/user/info/info.component';
import { NavComponent } from './components/user/nav/nav.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashBoardAdminComponent } from './components/admin/dash-board-admin/dash-board-admin.component';
import { ProductAdminComponent } from './components/admin/product-admin/product-admin.component';
import { CategoryAdminComponent } from './components/admin/category-admin/category-admin.component';
import { NavAdminComponent } from './components/admin/nav-admin/nav-admin.component';
import { EditCategoryComponent } from './components/admin/category-admin/edit-category/edit-category.component';
import { EditProductComponent } from './components/admin/product-admin/edit-product/edit-product.component';
import { AddProductComponent } from './components/admin/product-admin/add-product/add-product.component';
import { EditPasswordComponent } from './components/user/edit-password/edit-password.component';
import { BillUserComponent } from './components/user/bill-user/bill-user.component';
import { DetailBillComponent } from './components/user/bill-user/detail-bill/detail-bill.component';
import { ListBillUserComponent } from './components/user/bill-user/list-bill-user/list-bill-user.component';
import { BillAdminComponent } from './components/admin/bill-admin/bill-admin.component';
import { DetailUserBillComponent } from './components/admin/bill-admin/detail-user-bill/detail-user-bill.component';
import { ListBillAdminComponent } from './components/admin/bill-admin/list-bill-admin/list-bill-admin.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { RevocerComponent } from './components/forget-password/revocer/revocer.component';
import { CategoryAnalyticComponent } from './components/admin/dash-board-admin/category-analytic/category-analytic.component';
import { ProductAnalyticComponent } from './components/admin/dash-board-admin/product-analytic/product-analytic.component';
import { BillAnalyticComponent } from './components/admin/dash-board-admin/bill-analytic/bill-analytic.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    DetailProductComponent,
    ShopComponent,
    HeaderComponent,
    CartComponent,
    ListProductComponent,
    SearchComponent,
    HotProductComponent,
    DiscountProductComponent,
    SellingProductComponent,
    ControllButtonComponent,
    FormComponent,
    ReactiveFormComponent,
    RegisterComponent,
    UserComponent,
    DashBoardComponent,
    InfoComponent,
    NavComponent,
    AdminComponent,
    DashBoardAdminComponent,
    ProductAdminComponent,
    CategoryAdminComponent,
    NavAdminComponent,
    EditCategoryComponent,
    EditProductComponent,
    AddProductComponent,
    EditPasswordComponent,
    BillUserComponent,
    ListBillUserComponent,
    DetailBillComponent,
    BillAdminComponent,
    DetailUserBillComponent,
    ListBillAdminComponent,
    ForgetPasswordComponent,
    RevocerComponent,
    CategoryAnalyticComponent,
    ProductAnalyticComponent,
    BillAnalyticComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgChartsModule,
  ],
  providers: [provideClientHydration(), CartService, HeaderComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
