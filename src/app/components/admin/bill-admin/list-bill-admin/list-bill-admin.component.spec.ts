import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBillAdminComponent } from './list-bill-admin.component';

describe('ListBillAdminComponent', () => {
  let component: ListBillAdminComponent;
  let fixture: ComponentFixture<ListBillAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListBillAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListBillAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
