import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStyledComponent } from './table-styled.component';

describe('TableStyledComponent', () => {
  let component: TableStyledComponent;
  let fixture: ComponentFixture<TableStyledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableStyledComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableStyledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
