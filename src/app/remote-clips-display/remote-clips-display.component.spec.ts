import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RemoteClipsDisplayComponent } from './remote-clips-display.component';
import {FIREBASE_OPTIONS} from '@angular/fire';
import {environment} from '../../environments/environment';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

describe('RemoteClipsDisplayComponent', () => {
  let component: RemoteClipsDisplayComponent;
  let fixture: ComponentFixture<RemoteClipsDisplayComponent>;
  const mockAuth = {
    user: of({
      uid: '123'
    })
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteClipsDisplayComponent ],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
        { provide: AngularFireAuth, useValue: mockAuth },
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
