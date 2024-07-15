import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionPageComponent } from './instruction-page.component';

describe('InstructionPageComponent', () => {
  let component: InstructionPageComponent;
  let fixture: ComponentFixture<InstructionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
