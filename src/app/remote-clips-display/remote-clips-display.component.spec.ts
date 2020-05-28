import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteClipsDisplayComponent } from './remote-clips-display.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { of } from 'rxjs';

describe('RemoteClipsDisplayComponent', () => {
  let component: RemoteClipsDisplayComponent;
  let fixture: ComponentFixture<RemoteClipsDisplayComponent>;
  let mockFirestore: jasmine.SpyObj<AngularFirestore>;
  let mockAuth: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(async(() => {
    mockAuth = jasmine.createSpyObj([''], ['user']);
    mockFirestore = jasmine.createSpyObj(['collection']);

    TestBed.configureTestingModule({
      declarations: [ RemoteClipsDisplayComponent ],
      providers: [
        { provide: AngularFirestore, useValue: mockFirestore },
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
