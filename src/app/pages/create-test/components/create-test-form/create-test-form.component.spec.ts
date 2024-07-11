import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestFormComponent } from './create-test-form.component';

describe('CreateTestFormComponent', () => {
  let component: CreateTestFormComponent;
  let fixture: ComponentFixture<CreateTestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTestFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
