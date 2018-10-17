import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRoutesComponent } from './table-routes.component';

describe('TableRoutesComponent', () => {
  let component: TableRoutesComponent;
  let fixture: ComponentFixture<TableRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
