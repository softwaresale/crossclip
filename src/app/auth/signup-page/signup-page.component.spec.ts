import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SignupPageComponent } from './signup-page.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../../state/state';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {FIREBASE_OPTIONS} from '@angular/fire';
import {environment} from '../../../environments/environment';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {appStateSelectAnySmall} from '../../state/app-state/app-state.selectors';
import {MemoizedSelector} from '@ngrx/store';
import {AppState} from '../../state/app-state/app-state.reducer';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import createSpy = jasmine.createSpy;
import { User } from 'firebase';

describe('SignupPageComponent', () => {
  let component: SignupPageComponent;
  let fixture: ComponentFixture<SignupPageComponent>;
  let mockStore: MockStore;
  let mockAnySmallBreakpoint: MemoizedSelector<AppState, boolean>;
  let mockRouter: Router;
  let mockSnackBar: MatSnackBar;
  let stubAuth: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(waitForAsync(() => {
    stubAuth = jasmine.createSpyObj(
      ['createUserWithEmailAndPassword', 'signInWithPopup'],
      { currentUser: Promise.resolve({ displayName: 'Test User' }) }
      );

    TestBed.configureTestingModule({
      declarations: [ SignupPageComponent ],
      imports: [
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        MatSnackBarModule,
        MatIconModule,
      ],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
        provideMockStore({ initialState }),
        { provide: AngularFireAuth, useValue: stubAuth },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    mockAnySmallBreakpoint = mockStore.overrideSelector(appStateSelectAnySmall, false);
    mockRouter = TestBed.inject(Router);
    mockSnackBar = TestBed.inject(MatSnackBar);

    fixture = TestBed.createComponent(SignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should do nothing if form invalid', done => {
      component.onSubmit().then(() => {
        expect(stubAuth.createUserWithEmailAndPassword).not.toHaveBeenCalled();
        done();
      });
    });

    it('should create new user when form is valid', done => {
      const updateProfileSpy = createSpy('updateProfile').and.resolveTo();
      const stubCreds = {
        user: {
          updateProfile: updateProfileSpy,
        } as unknown as User
      } as UserCredential;
      component.signupForm.setValue({ displayName: 'test', email: 'user@test.com', password: 'password', confirmPassword: 'password' });
      stubAuth.createUserWithEmailAndPassword.and.resolveTo(stubCreds);
      const navSpy = spyOn(mockRouter, 'navigate').and.resolveTo();
      const snackBarSpy = spyOn(mockSnackBar, 'open');

      component.onSubmit().then(() => {
        expect(stubAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith('user@test.com', 'password');
        expect(updateProfileSpy).toHaveBeenCalled();
        expect(navSpy).toHaveBeenCalledWith(['/local']);
        expect(snackBarSpy).toHaveBeenCalled();
        done();
      });
    });

    it('should handle error when it occurs', done => {
      component.signupForm.setValue({ displayName: 'test', email: 'user@test.com', password: 'password', confirmPassword: 'password' });
      stubAuth.createUserWithEmailAndPassword.and.rejectWith({message: 'Error'});

      component.onSubmit().then(() => {
        expect(stubAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith('user@test.com', 'password');
        expect(component.errorText$.getValue()).toEqual('Error');
        done();
      });
    });
  });

  describe('onGoogleSignIn', () => {
    it('should work on successful login', done => {
      const stubCreds = {
        user: {
          displayName: 'user'
        } as unknown as User
      } as UserCredential;
      stubAuth.signInWithPopup.and.resolveTo(stubCreds);
      const navSpy = spyOn(mockRouter, 'navigate').and.resolveTo();
      const snackBarSpy = spyOn(mockSnackBar, 'open');

      component.onGoogleSignIn().then(() => {
        expect(stubAuth.signInWithPopup).toHaveBeenCalled();
        expect(navSpy).toHaveBeenCalledWith(['/local']);
        expect(snackBarSpy).toHaveBeenCalledWith('Welcome user', 'CLOSE');
        done();
      });
    });

    it('should show error on failed login', done => {
      stubAuth.signInWithPopup.and.rejectWith({ message: 'Error' });

      component.onGoogleSignIn().then(() => {
        expect(stubAuth.signInWithPopup).toHaveBeenCalled();
        expect(component.errorText$.getValue()).toEqual('Error');
        done();
      });
    });
  });
});
