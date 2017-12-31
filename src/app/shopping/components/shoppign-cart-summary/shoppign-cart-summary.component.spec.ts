import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppignCartSummaryComponent } from './shoppign-cart-summary.component';

describe('ShoppignCartSummaryComponent', () => {
  let component: ShoppignCartSummaryComponent;
  let fixture: ComponentFixture<ShoppignCartSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppignCartSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppignCartSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
