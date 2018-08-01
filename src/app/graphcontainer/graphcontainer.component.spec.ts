import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphcontainerComponent } from './graphcontainer.component';

describe('GraphcontainerComponent', () => {
  let component: GraphcontainerComponent;
  let fixture: ComponentFixture<GraphcontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphcontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
