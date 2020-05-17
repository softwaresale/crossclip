import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalClipsDisplayComponent } from './local-clips-display.component';

describe('LocalClipsDisplayComponent', () => {
  let component: LocalClipsDisplayComponent;
  let fixture: ComponentFixture<LocalClipsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalClipsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalClipsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
