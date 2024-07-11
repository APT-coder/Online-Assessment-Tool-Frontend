import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonInactiveComponent } from './button-inactive.component';

describe('ButtonInactiveComponent', () => {
  let component: ButtonInactiveComponent;
  let fixture: ComponentFixture<ButtonInactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonInactiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
