import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteClipsDisplayComponent } from './remote-clips-display.component';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { User } from 'firebase';
import { of } from 'rxjs';
import { FIREBASE_OPTIONS, AngularFireModule, FirebaseOptions } from '@angular/fire';
import { Clip } from '../state/clip/clip.model';
import { environment } from 'src/environments/environment';

describe('RemoteClipsDisplayComponent', () => {
  let component: RemoteClipsDisplayComponent;
  let fixture: ComponentFixture<RemoteClipsDisplayComponent>;
  let mockFirestore: jasmine.SpyObj<AngularFirestore>;
  // let mockAuth: jasmine.SpyObj<AngularFireAuth>;
  let mockAuth: any;
  let mockCollectionRef: jasmine.SpyObj<AngularFirestoreCollection<Clip>>;
  let mockUser: any;

  beforeEach(async(() => {

    mockUser = { uid: '1234' };
    mockAuth = {
      user: of(mockUser),
    }

    // mockAuth = jasmine.createSpyObj([''], ['user']);
    // spyOnProperty(mockAuth, 'user', 'get').and.returnValue(mockUser);

    mockCollectionRef = jasmine.createSpyObj(['valueChanged']);
    mockCollectionRef.valueChanges.and.returnValue(of([])); // Return empty array for now

    mockFirestore = jasmine.createSpyObj(['collection']);
    mockFirestore.collection.and.returnValue(mockCollectionRef);

    TestBed.configureTestingModule({
      declarations: [ RemoteClipsDisplayComponent ],
      providers: [
        // This passes an empty value to the firebase options. This is required to run the test...
        { provide: FIREBASE_OPTIONS, useValue: {} },
        { provide: AngularFirestore, useValue: mockFirestore, deps: [FIREBASE_OPTIONS] },
        { provide: AngularFireAuth, useValue: mockAuth },
      ],
      imports: [
        /*
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,*/
      ],
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
