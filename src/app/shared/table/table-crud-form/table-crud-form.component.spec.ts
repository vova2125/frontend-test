import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCrudFormComponent } from './table-crud-form.component';

describe('TableCrudFormComponent', () => {
  let component: TableCrudFormComponent;
  let fixture: ComponentFixture<TableCrudFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCrudFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCrudFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
