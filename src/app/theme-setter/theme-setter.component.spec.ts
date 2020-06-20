import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSetterComponent } from './theme-setter.component';

describe('ThemeSetterComponent', () => {
  let component: ThemeSetterComponent;
  let fixture: ComponentFixture<ThemeSetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeSetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
