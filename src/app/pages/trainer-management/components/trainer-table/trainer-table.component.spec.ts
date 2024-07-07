import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerTableComponent } from './trainer-table.component';

describe('TrainerTableComponent', () => {
  let component: TrainerTableComponent;
  let fixture: ComponentFixture<TrainerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
