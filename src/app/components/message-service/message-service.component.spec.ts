import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageServiceComponent } from './message-service.component';

describe('MessageServiceComponent', () => {
  let component: MessageServiceComponent;
  let fixture: ComponentFixture<MessageServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
