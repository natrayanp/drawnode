import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartlandingComponent } from './chartlanding.component';

describe('ChartlandingComponent', () => {
  let component: ChartlandingComponent;
  let fixture: ComponentFixture<ChartlandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartlandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
