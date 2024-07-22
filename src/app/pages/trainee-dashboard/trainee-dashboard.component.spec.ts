import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeDashboardComponent } from './trainee-dashboard.component';

describe('TraineeDashboardComponent', () => {
  let component: TraineeDashboardComponent;
  let fixture: ComponentFixture<TraineeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineeDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
