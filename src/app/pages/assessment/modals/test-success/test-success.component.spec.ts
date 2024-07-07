import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSuccessComponent } from './test-success.component';

describe('TestSuccessComponent', () => {
  let component: TestSuccessComponent;
  let fixture: ComponentFixture<TestSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
