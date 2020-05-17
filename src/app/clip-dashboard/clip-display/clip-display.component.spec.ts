import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipDisplayComponent } from './clip-display.component';

describe('ClipDisplayComponent', () => {
  let component: ClipDisplayComponent;
  let fixture: ComponentFixture<ClipDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
