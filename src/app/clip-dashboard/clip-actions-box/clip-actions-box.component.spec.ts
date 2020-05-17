import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipActionsBoxComponent } from './clip-actions-box.component';

describe('ClipActionsBoxComponent', () => {
  let component: ClipActionsBoxComponent;
  let fixture: ComponentFixture<ClipActionsBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipActionsBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipActionsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
