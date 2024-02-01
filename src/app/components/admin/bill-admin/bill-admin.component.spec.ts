import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillAdminComponent } from './bill-admin.component';

describe('BillAdminComponent', () => {
  let component: BillAdminComponent;
  let fixture: ComponentFixture<BillAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
