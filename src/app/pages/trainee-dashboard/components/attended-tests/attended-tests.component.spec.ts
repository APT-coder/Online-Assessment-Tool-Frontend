import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendedTestsComponent } from './attended-tests.component';

describe('AttendedTestsComponent', () => {
  let component: AttendedTestsComponent;
  let fixture: ComponentFixture<AttendedTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendedTestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendedTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
