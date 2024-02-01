import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillAnalyticComponent } from './bill-analytic.component';

describe('BillAnalyticComponent', () => {
  let component: BillAnalyticComponent;
  let fixture: ComponentFixture<BillAnalyticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillAnalyticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillAnalyticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
