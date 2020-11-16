import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RemoteClipsDisplayComponent } from './remote-clips-display.component';
import {FIREBASE_OPTIONS} from '@angular/fire';
import {environment} from '../../environments/environment';

describe('RemoteClipsDisplayComponent', () => {
  let component: RemoteClipsDisplayComponent;
  let fixture: ComponentFixture<RemoteClipsDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteClipsDisplayComponent ],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
      ]
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
