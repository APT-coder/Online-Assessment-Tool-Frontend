import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNormalComponent } from './table-normal.component';

describe('TableNormalComponent', () => {
  let component: TableNormalComponent;
  let fixture: ComponentFixture<TableNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableNormalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
