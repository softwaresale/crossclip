import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RemoteClipsDisplayComponent } from './remote-clips-display.component';

describe('RemoteClipsDisplayComponent', () => {
  let component: RemoteClipsDisplayComponent;
  let fixture: ComponentFixture<RemoteClipsDisplayComponent>;

  beforeEach(waitForAsync(() => {
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
