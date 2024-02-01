import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { log } from 'util';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  constructor(private _http: HttpClient) {}
  listPro: any;
  cateFilter: { id: number; name: string } = {
    id: 0,
    name: '',
  };
  controllPro: boolean | null = null;
  pageNum: number = 1;
  pageSize: number = 4;
  listFull: any;
  total: any;
  show: string = 'Tất cả sản phẩm';
  controll: string = '';
  urlBonus = '';
  key: string = '';
  submitSearch: boolean = false;

  ngOnInit(): void {
    this._http.get('http://localhost:3000/products').subscribe((data) => {
      this.listFull = data;
      this.total = this.listFull.length;
    });
    this.Render();
  }
  Render() {
    this._http
      .get(
        `http://localhost:3000/products?${this.urlBonus}_page=${this.pageNum}&_limit=${this.pageSize}`
      )
      .subscribe((data) => {
        this.listPro = data;
      });
  }
  HandleFilterCate(e: any) {
    this.controll = '';
    this.urlBonus = '';
    if (this.submitSearch) {
      this.urlBonus += `name_product_like=${this.key}&`;
      this.controll += `Ket qua tim kiem: ${this.key}`;
    }
    if (e.id == 0) {
      this.show = 'Tất cả sản phẩm';
      this.total = this.listFull.length;
      this.Render();
      return;
    }
    this.cateFilter.id = e.id;
    this.cateFilter.name = e.name;
    let count = 0;
    this.show = `Sách loại: ${e.name}`;

    for (let i = 0; i < this.listFull.length; i++) {
      if (this.listFull[i].id_category == e.id) {
        count++;
      }
    }

    this.total = count;
    this.pageNum = 1;
    this.urlBonus += `id_category=${this.cateFilter.id}&`;
    this._http
      .get(
        `http://localhost:3000/products?${this.urlBonus}&_page=${this.pageNum}&_limit=${this.pageSize}`
      )
      .subscribe((data) => {
        this.listPro = data;
        console.log(this.listPro);
        console.log(this.total);
      });
  }
  HandleFilter(e: any) {
    let stringBonus = '';
    let showBonus = 'Sắp xếp: ';
    if (this.cateFilter.id != 0) {
      stringBonus += `id_category=${this.cateFilter.id}&`;
      if (this.submitSearch) {
        showBonus += `Ket qua tim kiem: ${this.key}`;
      }
    }
    if (this.submitSearch) {
      stringBonus += `name_product_like=${this.key}&`;
    }
    if (e === null) {
      stringBonus += `_sort=created_at&_order=desc&`;
      showBonus = `Sắp xếp: Mới nhất`;
      if (this.submitSearch) {
        showBonus += `| Ket qua tim kiem: ${this.key}`;
      }
      this.controll = showBonus;
      // if (this.submitSearch) {
      //   this.listPro.sort((a: any, b: any) => {
      //     return (
      //       new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      //     );
      //   });
      //   return;
      // }
      this.urlBonus = stringBonus;
      this._http
        .get(
          `http://localhost:3000/products?${this.urlBonus}_page=${this.pageNum}&_limit=${this.pageSize}`
        )
        .subscribe((data) => {
          this.listPro = data;
        });
      return;
    }
    stringBonus += `_sort=price&`;
    if (!e) {
      showBonus += `| Giá gốc từ cao đến thấp`;
      stringBonus += `_order=desc&`;
    } else {
      showBonus += `| Giá gốc từ thấp đến cao`;
    }
    this.controll = showBonus;
    this.urlBonus = stringBonus;
    this._http
      .get(
        `http://localhost:3000/products?${this.urlBonus}_page=${this.pageNum}&_limit=${this.pageSize}`
      )
      .subscribe((data) => {
        this.listPro = data;
      });
  }
  getSearch(e: string) {
    this.submitSearch = true;
    this.key = e;
    this.show = `Kết quả tìm kiếm: ${this.key}`;
    this.controll = '';
    this.filter();
  }
  filter() {
    // console.log(this.key.toLocaleLowerCase());
    // this.listPro = this.listFull.filter((p: any) => {
    //   return (
    //     p.name_product
    //       .toLocaleLowerCase()
    //       .indexOf(this.key.toLocaleLowerCase()) != -1
    //   );
    // });
    // console.log(this.listPro);
    let listFilter: any;
    this.pageNum = 1;
    this.urlBonus = `name_product_like=${this.key}&`;
    this._http
      .get(`http://localhost:3000/products?${this.urlBonus}}`)
      .subscribe((data) => {
        listFilter = data;
        this.total = listFilter.length;
      });
    this._http
      .get(
        `http://localhost:3000/products?${this.urlBonus}_page=${this.pageNum}&_limit=${this.pageSize}`
      )
      .subscribe((data) => {
        this.listPro = data;
      });
  }

  transPage(p: any) {
    this.pageNum = p;
    this.Render();
  }
}
