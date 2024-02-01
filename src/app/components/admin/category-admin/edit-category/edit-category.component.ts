import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { CategoryAdminService } from '../category-admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
})
export class EditCategoryComponent {
  cateId: any;
  cateInfo: any;
  newCate: any = {
    name: '',
    id: '',
  };
  alert = {
    status: false,
    color: '',
    mess: '',
  };
  constructor(
    private cate: CategoryAdminService,
    private cd: ChangeDetectorRef,
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.cateId = params['id'];
      this.newCate.id = this.cateId;
    });
  }
  ngOnInit() {
    this.Render();
  }
  async Render() {
    console.log(this.cateId);
    this.cateInfo = await this.cate.getInfoCategory(this.cateId);
    this.newCate.name = this.cateInfo.name_category;
  }
  async onSubmit() {
    if (this.newCate.name) {
      let result = await this.cate.updateCategory(this.newCate);
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
      this.router.navigate(['/admin/category']);
    }
    return false;
  }
}
