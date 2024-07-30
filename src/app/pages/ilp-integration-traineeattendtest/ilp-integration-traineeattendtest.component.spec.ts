import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlpIntegrationTraineeattendtestComponent } from './ilp-integration-traineeattendtest.component';

describe('IlpIntegrationTraineeattendtestComponent', () => {
  let component: IlpIntegrationTraineeattendtestComponent;
  let fixture: ComponentFixture<IlpIntegrationTraineeattendtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IlpIntegrationTraineeattendtestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlpIntegrationTraineeattendtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
