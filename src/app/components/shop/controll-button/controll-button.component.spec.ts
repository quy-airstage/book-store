import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllButtonComponent } from './controll-button.component';

describe('ControllButtonComponent', () => {
  let component: ControllButtonComponent;
  let fixture: ComponentFixture<ControllButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControllButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControllButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
