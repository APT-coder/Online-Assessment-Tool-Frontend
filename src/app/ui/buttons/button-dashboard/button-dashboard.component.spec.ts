import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDashboardComponent } from './button-dashboard.component';

describe('ButtonDashboardComponent', () => {
  let component: ButtonDashboardComponent;
  let fixture: ComponentFixture<ButtonDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
