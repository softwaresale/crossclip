import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RevalidateCredentialsDialogComponent } from './revalidate-credentials-dialog.component';
import {MatDialogRef} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {FIREBASE_OPTIONS} from '@angular/fire';
import {environment} from '../../../../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import createSpyObj = jasmine.createSpyObj;
import createSpy = jasmine.createSpy;
import { auth, User } from 'firebase';

describe('RevalidateCredentialsDialogComponent', () => {
  let component: RevalidateCredentialsDialogComponent;
  let fixture: ComponentFixture<RevalidateCredentialsDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<RevalidateCredentialsDialogComponent>>;
  let mockUser: jasmine.SpyObj<User>;

  beforeEach(waitForAsync(() => {
    mockDialogRef = jasmine.createSpyObj(['close']);
    mockUser = jasmine.createSpyObj(['reauthenticateWithCredential']);

    TestBed.configureTestingModule({
      declarations: [ RevalidateCredentialsDialogComponent ],
      imports: [
        ReactiveFormsModule,
      ],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: AngularFireAuth, useValue: { currentUser: Promise.resolve(mockUser) }}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevalidateCredentialsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onLogin', () => {
    it('should do nothing in form invalid', done => {
      component.onLogin().then(() => {
        expect(mockDialogRef.close).not.toHaveBeenCalled();
        done();
      });
    });

    it('should close with true on valid reauthentication', done => {
      component.loginForm.setValue({ email: 'user@test.com', password: 'password' });
      const reauthenticateSpy = mockUser.reauthenticateWithCredential.and.resolveTo();

      component.onLogin().then(() => {
        const expectedCred = auth.EmailAuthProvider.credential('user@test.com', 'password');
        expect(reauthenticateSpy).toHaveBeenCalledWith(expectedCred);
        expect(mockDialogRef.close).toHaveBeenCalledWith(true);
        done();
      });
    });

    it('should close with false on invalid reauthentication', done => {
      component.loginForm.setValue({ email: 'user@test.com', password: 'password' });
      const reauthenticateSpy = mockUser.reauthenticateWithCredential.and.rejectWith();

      component.onLogin().then(() => {
        const expectedCred = auth.EmailAuthProvider.credential('user@test.com', 'password');
        expect(reauthenticateSpy).toHaveBeenCalledWith(expectedCred);
        expect(mockDialogRef.close).toHaveBeenCalledWith(false);
        done();
      });
    });
  });
});
