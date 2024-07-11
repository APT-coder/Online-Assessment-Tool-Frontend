import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagiNatorComponent } from './pagi-nator.component';

describe('PagiNatorComponent', () => {
  let component: PagiNatorComponent;
  let fixture: ComponentFixture<PagiNatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagiNatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagiNatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
