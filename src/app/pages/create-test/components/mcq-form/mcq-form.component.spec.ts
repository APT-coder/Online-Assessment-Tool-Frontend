import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McqFormComponent } from './mcq-form.component';

describe('McqFormComponent', () => {
  let component: McqFormComponent;
  let fixture: ComponentFixture<McqFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McqFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McqFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
