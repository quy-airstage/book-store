import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardAdminComponent } from './dash-board-admin.component';

describe('DashBoardAdminComponent', () => {
  let component: DashBoardAdminComponent;
  let fixture: ComponentFixture<DashBoardAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashBoardAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashBoardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
