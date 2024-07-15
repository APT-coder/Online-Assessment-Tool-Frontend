import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieDiagramComponent } from './pie-diagram.component';

describe('PieDiagramComponent', () => {
  let component: PieDiagramComponent;
  let fixture: ComponentFixture<PieDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieDiagramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
