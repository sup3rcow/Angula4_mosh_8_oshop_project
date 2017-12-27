import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppignFormComponent } from './shoppign-form.component';

describe('ShoppignFormComponent', () => {
  let component: ShoppignFormComponent;
  let fixture: ComponentFixture<ShoppignFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppignFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
