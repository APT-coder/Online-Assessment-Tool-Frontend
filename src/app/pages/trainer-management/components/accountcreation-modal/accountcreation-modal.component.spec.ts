import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountcreationModalComponent } from './accountcreation-modal.component';

describe('AccountcreationModalComponent', () => {
  let component: AccountcreationModalComponent;
  let fixture: ComponentFixture<AccountcreationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountcreationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountcreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
