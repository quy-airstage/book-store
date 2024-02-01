import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { CategoryAdminService } from './category-admin.service';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrl: './category-admin.component.css',
})
export class CategoryAdminComponent {
  allCate: any;
  newCate: any = {
    name: '',
  };
  alert = {
    status: false,
    color: '',
    mess: '',
  };
  constructor(
    private cate: CategoryAdminService,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) {}
  ngOnInit() {
    this.Render();
  }
  async Render() {
    this.allCate = await this.cate.getAllCategory();
    console.log(this.allCate);
  }
  async onSubmit() {
    if (this.newCate.name) {
      let result = await this.cate.addNewCategory(this.newCate);
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
    return false;
  }
  async Delete(id: any) {
    let result: any = await this.cate.deleteCategory(id);
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
}
