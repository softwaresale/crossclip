import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipContentViewComponent } from './clip-content-view.component';

describe('ClipContentViewComponent', () => {
  let component: ClipContentViewComponent;
  let fixture: ComponentFixture<ClipContentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClipContentViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipContentViewComponent);
    component = fixture.componentInstance;
    component.content = 'hello world';
    component.type = 'text/plain';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
