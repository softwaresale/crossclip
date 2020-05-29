import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteClipsDisplayComponent } from './remote-clips-display.component';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { FIREBASE_OPTIONS } from '@angular/fire';
import { Clip } from '../state/clip/clip.model';
import { AuthService } from '../auth/auth.service';
import { firestore } from 'firebase';

describe('RemoteClipsDisplayComponent', () => {
  let component: RemoteClipsDisplayComponent;
  let fixture: ComponentFixture<RemoteClipsDisplayComponent>;
  let mockFirestore: jasmine.SpyObj<AngularFirestore>;
  let mockAuth: jasmine.SpyObj<AuthService>;
  let mockCollectionRef: jasmine.SpyObj<AngularFirestoreCollection<Clip>>;
  let mockUser: any;
  let mockClip: Clip = {
    clipType: 'text/plain',
    content: 'Hello World',
    created: null,
    uid: '1234',
  };

  beforeEach(async(() => {

    mockUser = { uid: '1234' };
    mockAuth = jasmine.createSpyObj(['user']);

    mockCollectionRef = jasmine.createSpyObj(['valueChanges']); // Return empty array for now
    const mockClips = of([mockClip]);
    mockCollectionRef.valueChanges.and.returnValue(mockClips as any);

    mockFirestore = jasmine.createSpyObj(['collection']);
    mockFirestore.collection.and.returnValue(mockCollectionRef);
    /*mockFirestore.collection.and.callFake((path, queryFn) => {
      const passedQuery = queryFn();
      const mockClips = of([mockClip]);
      mockCollectionRef.valueChanges.and.returnValue(mockClips as any);
      return mockCollectionRef;
    });*/

    TestBed.configureTestingModule({
      declarations: [ RemoteClipsDisplayComponent ],
      providers: [
        // This passes an empty value to the firebase options. This is required to run the test...
        { provide: FIREBASE_OPTIONS, useValue: {} },
        { provide: AngularFirestore, useValue: mockFirestore, deps: [FIREBASE_OPTIONS] },
        { provide: AuthService, useValue: mockAuth },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteClipsDisplayComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('clips$', () => {

    it('should return clips when user is logged in and clip matches uid', done => {
      mockAuth.user.and.returnValue(of(mockUser));
      fixture.detectChanges();
      component.clips$.subscribe(clips => {
        expect(clips.length).toEqual(1);
        expect(clips[0]).toBe(mockClip);
        done();
      })
    });

    xit('should return no clips when user is not logged in', done => {
      mockAuth.user.and.returnValue(of(null));
      fixture.detectChanges();
      component.clips$.subscribe(clips => {
        expect(clips).toBeFalsy();
        done();
      });
    });
  });
});
