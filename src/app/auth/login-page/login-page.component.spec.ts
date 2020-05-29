import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialState } from 'src/app/state/state';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MemoizedSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app-state/app-state.reducer';
import { appStateSelectAnySmall } from 'src/app/state/app-state/app-state.selectors';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let mockAuth: jasmine.SpyObj<AngularFireAuth>;
  let mockCredentials: auth.UserCredential;
  let mockStore: MockStore;
  let mockSelectAnySmall: MemoizedSelector<AppState, boolean>;
  let formBuilder: FormBuilder;

  /*
    TODO: how should I test Material components?
  */

  beforeEach(async(() => {
    mockCredentials = {
      user: null,
      credential: null,
    };

    mockAuth = jasmine.createSpyObj(['signInWithEmailAndPassword', 'signInWithPopup']);
    mockAuth.signInWithEmailAndPassword.and.resolveTo(mockCredentials);
    mockAuth.signInWithPopup.and.resolveTo(mockCredentials);
    
    TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      providers: [
        provideMockStore({ initialState }),
        { provide: AngularFireAuth, useValue: mockAuth },
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatIconModule,
        MatSnackBarModule,
        HttpClientTestingModule,
      ]
    })
    .compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
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

  describe('login', () => {
    it ('should call #signInWithUsernamdAndPassword with valid form state', done => {
      const mockFormState = { email: 'user@test.com', password: 'password' };
      spyOnProperty(component.loginForm, 'valid', 'get').and.returnValue(true);
      // spyOnProperty(component.loginForm, 'value').and.returnValue(mockFormState);
      component.loginForm.setValue(mockFormState);

      component.onLogin().then(() => {
        expect(mockAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(mockFormState.email, mockFormState.password);
        // TODO test that signInWithEmailAndPassword resolves
        done();
      });
    });

    it ('should do nothing with invalid form state', done => {
      spyOnProperty(component.loginForm, 'valid', 'get').and.returnValue(false);

      // TODO test that this resolves and does nothing
      component.onLogin().then(() => {
        expect(mockAuth.signInWithEmailAndPassword).not.toHaveBeenCalled();
        done();
      });
    });
  });

  describe('onGoogleLogin', () => {
    it ('should call #signInWithPopup', done => {
      component.onGoogleLogin().then(() => {
        expect(mockAuth.signInWithPopup).toHaveBeenCalled();
        done();
      });
    });
  });
});
