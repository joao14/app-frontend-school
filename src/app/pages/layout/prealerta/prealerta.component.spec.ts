import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrealertaComponent } from './prealerta.component';

describe('PrealertaComponent', () => {
  let component: PrealertaComponent;
  let fixture: ComponentFixture<PrealertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrealertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrealertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
