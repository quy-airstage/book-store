import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductAdminService } from '../product-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  productForm!: FormGroup;
  keywordBan = ['ma túy', 'ma tuy', 'hàng trắng', 'hang trang', 'thuốc nổ'];
  ban = '';
  listCate: any;
  alert = {
    status: false,
    color: '',
    mess: '',
  };
  constructor(
    private http: HttpClient,
    private pro: ProductAdminService,
    private router: Router
  ) {}
  async ngOnInit() {
    this.productForm = new FormGroup({
      name_product: new FormControl(''),
      publisher: new FormControl(''),
      provider: new FormControl(''),
      price: new FormControl(),
      discount: new FormControl(0),
      author: new FormControl(''),
      img: new FormControl(''),
      view: new FormControl(0),
      hot: new FormControl(0),
      id_category: new FormControl(''),
    });
    this.listCate = await this.pro.getAllCategory();
  }
  checkName(name: string) {
    const productName = name;
    let string = '';
    this.keywordBan.forEach((val) => {
      if (val.toLocaleLowerCase().includes(productName)) {
        string = `Không được sử dụng từ "${productName}"`;
        return;
      }
    });
    this.ban = string;
  }

  async onSubmit() {
    this.checkName(this.productForm.get('name_product')?.value.toLowerCase());

    if (
      this.productForm.get('name_product')?.value &&
      this.productForm.get('id_category')?.value &&
      this.productForm.get('price')?.value &&
      this.productForm.get('author')?.value &&
      this.productForm.get('provider')?.value &&
      this.productForm.get('publisher')?.value
    ) {
      let imgPath: any = await this.submitPhoto();
      this.productForm.patchValue({
        img: String(imgPath.img),
      });
      try {
        let result = await this.pro.addNewProduct(this.productForm.value);
        this.alert = {
          status: result.status,
          color: result.status ? 'text-green-500' : 'text-red-500',
          mess: result.mess,
        };
      } catch (error) {
        this.alert = {
          status: false,
          color: 'text-red-500',
          mess: 'Lỗi server!',
        };
      }
    }
    if (this.alert.status) {
      this.router.navigate(['/admin/product']);
    }
    return false;
  }

  img!: any;
  fileChoosen(event: any) {
    if (event.target.value) {
      this.img = <File>event.target.files[0];
    }
  }
  async submitPhoto() {
    let fd = new FormData();
    let imgPath = '';
    if (this.img) {
      fd.append('productImage', this.img, this.img.name);
      imgPath = await fetch('http://localhost:1210/upload/img', {
        method: 'POST',

        body: fd,
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          return result;
        })
        .catch((err) => {});
    }
    if (!imgPath) {
      imgPath = 'http://127.0.0.1:1210/uploads/sach.jpg';
    }
    return imgPath;
  }
  imageUrl!: string;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.previewImage(file);
    }
  }

  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
