import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUserBillComponent } from './detail-user-bill.component';

describe('DetailUserBillComponent', () => {
  let component: DetailUserBillComponent;
  let fixture: ComponentFixture<DetailUserBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailUserBillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailUserBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
