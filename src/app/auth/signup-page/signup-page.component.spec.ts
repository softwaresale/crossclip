import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPageComponent } from './signup-page.component';
import { provideMockStore, MockState, MockStore } from '@ngrx/store/testing';
import { initialState } from 'src/app/state/state';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MemoizedSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app-state/app-state.reducer';
import { appStateSelectAnySmall } from 'src/app/state/app-state/app-state.selectors';
import { FIREBASE_OPTIONS } from '@angular/fire';
import { User, auth } from 'firebase';

describe('SignupPageComponent', () => {
  let component: SignupPageComponent;
  let fixture: ComponentFixture<SignupPageComponent>;
  let mockStore: MockStore;
  let mockSelectAnySmall: MemoizedSelector<AppState, boolean>;
  let authSpy: jasmine.SpyObj<AngularFireAuth>;
  let mockUser: jasmine.SpyObj<User>;
  let mockUserCredStub = {
    user: mockUser,
  };
  let mockAuthStub = {
    currentUser: () => Promise.resolve(mockUser),
    createUserWithEmailAndPassword: jasmine.createSpy('createUserWithEmailAndPassword').and.resolveTo(mockUserCredStub)
  };

  beforeEach(async(() => {
    authSpy = jasmine.createSpyObj(['createUserWithEmailAndPassword'], ['currentUser']);
    mockUser = jasmine.createSpyObj(['updateProfile']);
    mockUser.updateProfile.and.resolveTo();

    TestBed.configureTestingModule({
      declarations: [ SignupPageComponent ],
      providers: [
        provideMockStore({ initialState }),
        { provide: FIREBASE_OPTIONS, useValue: {} },
        { provide: AngularFireAuth, useValue: mockAuthStub },
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatSnackBarModule,
        HttpClientModule,
        MatIconModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPageComponent);
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

  describe('onSubmit', () => {
    xit('should submit if form is valid', done => {
      // Mock current user
      mockAuthStub.createUserWithEmailAndPassword.and.resolveTo(mockUserCredStub);
      const mockFormState = { email: 'user@test.com', password: 'password', confirmPassword: 'password', displayName: 'Test' };
      spyOnProperty(component.signupForm, 'valid').and.returnValue(true);
      component.signupForm.setValue(mockFormState);
      const createIconSpy = spyOn<any>(component, 'createTempAvatarFromSeed');
      const handleSuccessSpy = spyOn<any>(component, 'handleSuccess');

      component.onSubmit().then(() => {
        // expect(authSpy.createUserWithEmailAndPassword).toHaveBeenCalledWith(mockFormState.email, mockFormState.password);
        expect(mockAuthStub.createUserWithEmailAndPassword).toHaveBeenCalledWith(mockFormState.email, mockFormState.password);
        expect(createIconSpy).toHaveBeenCalledWith(mockFormState.email);
        expect(handleSuccessSpy).toHaveBeenCalledWith(mockFormState.displayName);
        expect(mockUser.updateProfile).toHaveBeenCalled();
        done();
      });
    });
  });
});
