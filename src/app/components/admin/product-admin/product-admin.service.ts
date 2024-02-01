import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductAdminService {
  constructor() {}
  async getAllCategory() {
    let allCate = await fetch(`http://localhost:3000/categories`)
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
    return allCate;
  }
  async getAllProduct() {
    let allPro = await fetch(`http://localhost:3000/products`)
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
    return allPro;
  }
  async getInfoProduct(id: any) {
    let infoPro = await fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
    return infoPro;
  }

  async addNewProduct(control: any) {
    let time = new Date();
    let check = {
      status: false,
      mess: '',
    };
    let form = {
      name_product: control.name_product,
      publisher: control.publisher,
      provider: control.provider,
      price: control.price,
      discount: control.discount || 0,
      sold: control.sold || 0,
      author: control.author,
      view: control.view || 0,
      hot: control.hot || 0,
      img: control.img,
      created_at: time.getTime(),
      id_category: control.id_category,
    };

    await fetch('http://localhost:3000/products', {
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
        check = {
          status: true,
          mess: 'Thêm mới thành công.',
        };
      })
      .catch((err) => {
        check = {
          status: false,
          mess: 'Thêm mới thất bại.',
        };
      });
    return check;
  }
  async updateProduct(control: any) {
    let time = new Date();
    let check = {
      status: false,
      mess: '',
    };
    let form = {
      name_product: control.name_product,
      publisher: control.publisher,
      provider: control.provider,
      price: control.price,
      discount: control.discount || 0,
      sold: control.sold || 0,
      author: control.author,
      view: control.view || 0,
      hot: control.hot || 0,
      img: control.img,
      id_category: control.id_category,
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
      .then((result) => {
        check = {
          status: true,
          mess: 'Chỉnh sửa thành công.',
        };
      })
      .catch((err) => {
        check = {
          status: false,
          mess: 'Chỉnh sửa thất bại.',
        };
      });
    return check;
  }
  async deleteProduct(id: any) {
    let check;
    await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);

        check = {
          status: true,
          mess: 'Xóa sản phẩm thành công.',
        };
      })
      .catch((err) => {
        check = {
          status: false,
          mess: 'Xóa sản phẩm thất bại.',
        };
      });
    return check;
  }
}
