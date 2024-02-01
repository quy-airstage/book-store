import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductAdminService } from '../product-admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  productForm!: FormGroup;
  keywordBan = ['ma túy', 'ma tuy', 'hàng trắng', 'hang trang', 'thuốc nổ'];
  ban = '';
  productId: any;
  listCate: any;
  alert = {
    status: false,
    color: '',
    mess: '',
  };
  imageUrl!: string;

  constructor(
    private http: HttpClient,
    private pro: ProductAdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
    });
  }
  async ngOnInit() {
    this.productForm = new FormGroup({
      id: new FormControl(),
      name_product: new FormControl(),
      publisher: new FormControl(),
      provider: new FormControl(),
      price: new FormControl(),
      discount: new FormControl(),
      author: new FormControl(),
      img: new FormControl(),
      view: new FormControl(),
      hot: new FormControl(),
      id_category: new FormControl(),
    });
    let infoPro = await this.pro.getInfoProduct(this.productId);
    console.log(infoPro);

    this.productForm.patchValue({
      id: infoPro.id,
      name_product: infoPro.name_product,
      publisher: infoPro.publisher,
      provider: infoPro.provider,
      price: infoPro.price,
      discount: infoPro.discount,
      author: infoPro.author,
      img: infoPro.img,
      view: infoPro.view,
      hot: infoPro.hot,
      id_category: infoPro.id_category,
    });
    this.imageUrl = infoPro.img;
    console.log(this.productForm.value);

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
        let result = await this.pro.updateProduct(this.productForm.value);
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
