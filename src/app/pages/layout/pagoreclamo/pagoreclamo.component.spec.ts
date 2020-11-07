import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoreclamoComponent } from './pagoreclamo.component';

describe('PagoreclamoComponent', () => {
  let component: PagoreclamoComponent;
  let fixture: ComponentFixture<PagoreclamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoreclamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoreclamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
