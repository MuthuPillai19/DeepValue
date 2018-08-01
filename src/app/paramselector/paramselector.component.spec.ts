import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamselectorComponent } from './paramselector.component';

describe('ParamselectorComponent', () => {
  let component: ParamselectorComponent;
  let fixture: ComponentFixture<ParamselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
