import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashBoardAdminService {
  constructor() {}
  async AmountProductInCate() {
    let cate = await fetch(`http://localhost:3000/categories`)
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
    let listCate: any = [];
    for (const category of cate) {
      let amount = await fetch(
        `http://localhost:3000/products?id_category=${category.id}`
      )
        .then((res) => res.json())
        .then((result) => {
          return result.length;
        });

      listCate = [
        ...listCate,
        {
          id: category.id,
          name: category.name_category,
          amount: amount,
        },
      ];
    }
    console.log(listCate);
    return listCate;
  }
  async ViewProduct() {
    let pro = await fetch(
      `http://localhost:3000/products?_sort=view&_order=desc`
    )
      .then((res) => res.json())
      .then((result) => {
        return result;
      });

    console.log(pro);
    return pro;
  }
  async SoldProduct() {
    let pro = await fetch(
      `http://localhost:3000/products?_sort=sold&_order=desc`
    )
      .then((res) => res.json())
      .then((result) => {
        return result;
      });

    console.log(pro);
    return pro;
  }
  async AllBillRevenue() {
    let time = new Date().getTime();
    let timeOneDay = 1000 * 60 * 60 * 24;
    let oneDayAgo = time - timeOneDay;
    let oneWeekAgo = time - 7 * timeOneDay;
    let oneMonthAgo = time - 30 * timeOneDay;
    let anaRevenue = [
      {
        total: 0,
        name: 'Tổng',
      },
      {
        total: 0,
        name: '30 ngày qua',
      },
      {
        total: 0,
        name: '7 ngày qua',
      },
      {
        total: 0,
        name: '1 ngày qua',
      },
    ];
    let bills = await fetch(`http://localhost:3000/bill?status=2`)
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
    bills.forEach((bill: any) => {
      if (bill.create_at - oneDayAgo >= 0) {
        bill.product.forEach((pro: any) => {
          anaRevenue[3].total +=
            (pro.price_product -
              (pro.price_product *
                (pro.discount_product ? pro.discount_product : 0)) /
                100) *
            pro.amount_product;
        });
      }
      if (bill.create_at - oneWeekAgo >= 0) {
        bill.product.forEach((pro: any) => {
          anaRevenue[2].total +=
            (pro.price_product -
              (pro.price_product *
                (pro.discount_product ? pro.discount_product : 0)) /
                100) *
            pro.amount_product;
        });
      }
      if (bill.create_at - oneMonthAgo >= 0) {
        bill.product.forEach((pro: any) => {
          anaRevenue[1].total +=
            (pro.price_product -
              (pro.price_product *
                (pro.discount_product ? pro.discount_product : 0)) /
                100) *
            pro.amount_product;
        });
      }
      bill.product.forEach((pro: any) => {
        anaRevenue[0].total +=
          (pro.price_product -
            (pro.price_product *
              (pro.discount_product ? pro.discount_product : 0)) /
              100) *
          pro.amount_product;
      });
    });
    console.log(anaRevenue);

    return anaRevenue;
  }
}
