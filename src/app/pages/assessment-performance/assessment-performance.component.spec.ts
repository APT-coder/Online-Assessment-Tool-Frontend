import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentPerformanceComponent } from './assessment-performance.component';

describe('AssessmentPerformanceComponent', () => {
  let component: AssessmentPerformanceComponent;
  let fixture: ComponentFixture<AssessmentPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentPerformanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
