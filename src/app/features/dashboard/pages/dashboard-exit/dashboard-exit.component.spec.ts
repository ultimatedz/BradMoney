import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardExitComponent } from './dashboard-exit.component';

describe('DashboardExitComponent', () => {
  let component: DashboardExitComponent;
  let fixture: ComponentFixture<DashboardExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardExitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
