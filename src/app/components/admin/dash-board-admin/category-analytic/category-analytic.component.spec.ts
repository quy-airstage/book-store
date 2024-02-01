import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAnalyticComponent } from './category-analytic.component';

describe('CategoryAnalyticComponent', () => {
  let component: CategoryAnalyticComponent;
  let fixture: ComponentFixture<CategoryAnalyticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryAnalyticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryAnalyticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
