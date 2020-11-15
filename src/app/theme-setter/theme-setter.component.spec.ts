import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThemeSetterComponent } from './theme-setter.component';

describe('ThemeSetterComponent', () => {
  let component: ThemeSetterComponent;
  let fixture: ComponentFixture<ThemeSetterComponent>;

  beforeEach(waitForAsync(() => {
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
