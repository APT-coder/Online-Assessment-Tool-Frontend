import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentEvaluateComponent } from './assessment-evaluate.component';

describe('AssessmentEvaluateComponent', () => {
  let component: AssessmentEvaluateComponent;
  let fixture: ComponentFixture<AssessmentEvaluateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentEvaluateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentEvaluateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
