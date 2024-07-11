import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPointsComponent } from './button-points.component';

describe('ButtonPointsComponent', () => {
  let component: ButtonPointsComponent;
  let fixture: ComponentFixture<ButtonPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonPointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
