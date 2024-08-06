import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemainingChanceDailogueComponent } from './remaining-chance-dailogue.component';

describe('RemainingChanceDailogueComponent', () => {
  let component: RemainingChanceDailogueComponent;
  let fixture: ComponentFixture<RemainingChanceDailogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemainingChanceDailogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemainingChanceDailogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
