import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolecreationCardComponent } from './rolecreation-card.component';

describe('RolecreationCardComponent', () => {
  let component: RolecreationCardComponent;
  let fixture: ComponentFixture<RolecreationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolecreationCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolecreationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
