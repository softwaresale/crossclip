import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../../state/state';
import { FIREBASE_OPTIONS} from '@angular/fire';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MemoizedSelector} from '@ngrx/store';
import {AppState} from '../../state/app-state/app-state.reducer';
import {appStateSelectAnySmall} from '../../state/app-state/app-state.selectors';
import {environment} from '../../../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import { Router } from '@angular/router';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let mockStore: MockStore;
  let mockAnySmallBreakpoint: MemoizedSelector<AppState, boolean>;
  let auth: AngularFireAuth;
  let mockRouter: Router;
  let mockSnackbar: MatSnackBar;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        MatSnackBarModule,
        // AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    mockAnySmallBreakpoint = mockStore.overrideSelector(appStateSelectAnySmall, false);

    auth = TestBed.inject(AngularFireAuth);
    mockRouter = TestBed.inject(Router);
    mockSnackbar = TestBed.inject(MatSnackBar);

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onLogin', () => {
    it ('should work when login form is valid', done => {
      component.loginForm.get('email').setValue('user@test.com');
      component.loginForm.get('password').setValue('password');

      const mockCreds = {
        user: {
          displayName: 'test'
        }
      } as UserCredential;
      const loginSpy = spyOn(auth, 'signInWithEmailAndPassword').and.resolveTo(mockCreds);
      const navigateSpy = spyOn(mockRouter, 'navigate').and.resolveTo();
      const openSpy = spyOn(mockSnackbar, 'open');

      component.onLogin().then(() => {
        expect(loginSpy).toHaveBeenCalledWith('user@test.com', 'password');
        expect(navigateSpy).toHaveBeenCalledWith(['/local']);
        expect(openSpy).toHaveBeenCalledWith('Welcome test', 'CLOSE');
        done();
      });
    });
  });

  describe('onGoogleLogin', () => {
    it('should login properly', done => {
      const mockCreds = {
        user: {
          displayName: 'test'
        }
      } as UserCredential;
      const signInSpy = spyOn(auth, 'signInWithPopup').and.resolveTo(mockCreds);
      const navigateSpy = spyOn(mockRouter, 'navigate').and.resolveTo();
      const openSpy = spyOn(mockSnackbar, 'open');

      component.onGoogleLogin().then(() => {
        expect(signInSpy).toHaveBeenCalled();
        expect(navigateSpy).toHaveBeenCalledWith(['/local']);
        expect(openSpy).toHaveBeenCalledWith('Welcome test', 'CLOSE');
        done();
      });
    });
  });
});
