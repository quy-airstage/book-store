import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBillUserComponent } from './list-bill-user.component';

describe('ListBillUserComponent', () => {
  let component: ListBillUserComponent;
  let fixture: ComponentFixture<ListBillUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListBillUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListBillUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
