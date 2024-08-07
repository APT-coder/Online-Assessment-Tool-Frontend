import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveCardComponent } from './live-card.component';

describe('LiveCardComponent', () => {
  let component: LiveCardComponent;
  let fixture: ComponentFixture<LiveCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
