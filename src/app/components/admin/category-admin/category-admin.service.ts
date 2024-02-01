import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CategoryAdminService {
  constructor(private router: Router) {}
  async getAllCategory() {
    let allPro = await fetch(`http://localhost:3000/categories`)
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
    return allPro;
  }
  async getInfoCategory(id: any) {
    let infoPro = await fetch(`http://localhost:3000/categories/${id}`)
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
    return infoPro;
  }

  async addNewCategory(control: any) {
    let check = {
      status: false,
      mess: '',
    };
    let form = {
      name_category: control.name,
    };
    await fetch('http://localhost:3000/categories', {
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
        console.log(result);

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
  async updateCategory(control: any) {
    let check = {
      status: false,
      mess: '',
    };
    let form = {
      name_category: control.name,
    };
    await fetch(`http://localhost:3000/categories/${control.id}`, {
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
        console.log(result);

        check = {
          status: true,
          mess: 'Cập nhật thành công.',
        };
      })
      .catch((err) => {
        check = {
          status: false,
          mess: 'Cập nhật thất bại.',
        };
      });
    return check;
  }
  async deleteCategory(id: any) {
    let check;
    await fetch(`http://localhost:3000/categories/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);

        check = {
          status: true,
          mess: 'Xóa danh mục thành công.',
        };
      })
      .catch((err) => {
        check = {
          status: false,
          mess: 'Xóa danh mục thất bại.',
        };
      });
    return check;
  }
}
