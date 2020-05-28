import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileViewComponent } from './profile-view.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialState } from 'src/app/state/state';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { MemoizedSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app-state/app-state.reducer';
import { appStateSelectAnySmall } from 'src/app/state/app-state/app-state.selectors';

describe('ProfileViewComponent', () => {
  let component: ProfileViewComponent;
  let fixture: ComponentFixture<ProfileViewComponent>;
  let mockAuth: jasmine.SpyObj<AngularFireAuth>;
  let mockCredentials: auth.UserCredential;
  let mockStore: MockStore;
  let mockSelectAnySmall: MemoizedSelector<AppState, boolean>;

  beforeEach(async(() => {
    mockCredentials = {
      user: null,
      credential: null,
    };

    mockAuth = jasmine.createSpyObj(['signInWithEmailAndPassword', 'signInWithPopup']);
    mockAuth.signInWithEmailAndPassword.and.resolveTo(mockCredentials);
    mockAuth.signInWithPopup.and.resolveTo(mockCredentials);

    TestBed.configureTestingModule({
      declarations: [ ProfileViewComponent ],
      providers: [
        provideMockStore({ initialState }),
        { provide: AngularFireAuth, useValue: mockAuth },
      ],
      imports: [
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileViewComponent);
    component = fixture.componentInstance;

    mockStore = TestBed.inject(MockStore);
    mockSelectAnySmall = mockStore.overrideSelector(
      appStateSelectAnySmall,
      true
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
