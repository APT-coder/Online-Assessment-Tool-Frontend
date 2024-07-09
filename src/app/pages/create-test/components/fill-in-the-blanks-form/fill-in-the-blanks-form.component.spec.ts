import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInTheBlanksFormComponent } from './fill-in-the-blanks-form.component';

describe('FillInTheBlanksFormComponent', () => {
  let component: FillInTheBlanksFormComponent;
  let fixture: ComponentFixture<FillInTheBlanksFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillInTheBlanksFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillInTheBlanksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
