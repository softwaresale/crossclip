import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteClipsDisplayComponent } from './remote-clips-display.component';

describe('RemoteClipsDisplayComponent', () => {
  let component: RemoteClipsDisplayComponent;
  let fixture: ComponentFixture<RemoteClipsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteClipsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteClipsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
