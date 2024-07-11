import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptiveFormComponent } from './descriptive-form.component';

describe('DescriptiveFormComponent', () => {
  let component: DescriptiveFormComponent;
  let fixture: ComponentFixture<DescriptiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptiveFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
