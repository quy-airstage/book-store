import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { ProductAdminService } from './product-admin.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrl: './product-admin.component.css',
})
export class ProductAdminComponent {
  listPro: any;
  listCate: any;
  pageNum: number = 1;
  pageSize: number = 4;
  listFull: any;
  total: any;
  alert = {
    status: false,
    color: '',
    mess: '',
  };
  constructor(
    private _http: HttpClient,
    private pro: ProductAdminService,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.Render();
  }
  async Render() {
    this.listFull = await this.pro.getAllProduct();
    this.total = this.listFull.length;
    this.listCate = await this.pro.getAllCategory();
    this._http
      .get(
        `http://localhost:3000/products?_sort=created_at&_order=desc&_page=${this.pageNum}&_limit=${this.pageSize}`
      )
      .subscribe((data) => {
        this.listPro = data;
      });
  }
  getNameCate(id: number) {
    let index = this.listCate.findIndex((cate: any) => cate.id == id);
    return this.listCate[index].name_category;
  }
  async DeleteProduct(id: number) {
    let result: any = await this.pro.deleteProduct(id);
    this.alert = {
      status: result.status,
      color: result.status ? 'text-green-500' : 'text-red-500',
      mess: result.mess,
    };
    this.zone.run(() => {
      this.Render();
      console.log('re');
      this.cd.detectChanges();
    });
  }

  transPage(p: any) {
    this.pageNum = p;
    this.Render();
  }
}
