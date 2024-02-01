import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAnalyticComponent } from './product-analytic.component';

describe('ProductAnalyticComponent', () => {
  let component: ProductAnalyticComponent;
  let fixture: ComponentFixture<ProductAnalyticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductAnalyticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductAnalyticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
