import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevocerComponent } from './revocer.component';

describe('RevocerComponent', () => {
  let component: RevocerComponent;
  let fixture: ComponentFixture<RevocerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RevocerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevocerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
