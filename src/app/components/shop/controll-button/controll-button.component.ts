import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-controll-button',
  templateUrl: './controll-button.component.html',
  styleUrl: './controll-button.component.css',
})
export class ControllButtonComponent {
  constructor(private _http: HttpClient) {}
  @Output() FilterCateClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() FilterPriceClick: EventEmitter<boolean | null> = new EventEmitter<
    boolean | null
  >();
  listCate: any;
  filterPrice: boolean | null = false;
  ngOnInit(): void {
    this.Render();
  }
  Render() {
    this._http.get('http://localhost:3000/categories').subscribe((data) => {
      this.listCate = data;
    });
  }
  onClickCate(id: number, name: string) {
    this.FilterCateClick.emit({
      id: id,
      name: name,
    });
  }
  onClickPrice() {
    this.filterPrice = !this.filterPrice;
    this.FilterPriceClick.emit(this.filterPrice);
  }
  onClickDate() {
    this.filterPrice = null;
    this.FilterPriceClick.emit(this.filterPrice);
  }
}
