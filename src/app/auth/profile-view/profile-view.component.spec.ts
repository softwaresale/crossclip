import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileViewComponent } from './profile-view.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../../state/state';
import {FIREBASE_OPTIONS} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {RouterTestingModule} from '@angular/router/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import {MemoizedSelector} from '@ngrx/store';
import {AppState} from '../../state/app-state/app-state.reducer';
import {appStateSelectAnySmall} from '../../state/app-state/app-state.selectors';
import {User} from 'firebase';
import {of} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { RevalidateCredentialsDialogComponent } from './revalidate-credentials-dialog/revalidate-credentials-dialog.component';
import { ProfileEditDialogComponent } from './profile-edit-dialog/profile-edit-dialog.component';

describe('ProfileViewComponent', () => {
  let component: ProfileViewComponent;
  let fixture: ComponentFixture<ProfileViewComponent>;
  let mockStore: MockStore;
  let mockAnySmallBreakpoint: MemoizedSelector<AppState, boolean>;
  let mockRouter: Router;
  let spyAuth: AngularFireAuth;
  let mockDialog: MatDialog;
  let mockSnackbar: MatSnackBar;
  const mockUser: User = {
    displayName: 'Test User',
    providerData: [
      { providerId: 'password' }
    ]
  } as User;
  const mockAuth = {
    user: of(mockUser),
    signOut: () => Promise.resolve(),
    currentUser: Promise.resolve({ delete: () => Promise.resolve() }),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileViewComponent ],
      imports: [
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
        { provide: AngularFireAuth, useValue: mockAuth },
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    mockAnySmallBreakpoint = mockStore.overrideSelector(appStateSelectAnySmall, false);

    spyAuth = TestBed.inject(AngularFireAuth);
    mockRouter = TestBed.inject(Router);
    mockDialog = TestBed.inject(MatDialog);
    mockSnackbar = TestBed.inject(MatSnackBar);

    fixture = TestBed.createComponent(ProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onLogout', () => {
    it('should sign out and navigate', done => {
      const signOutSpy = spyOn(spyAuth, 'signOut').and.resolveTo();
      const navSpy = spyOn(mockRouter, 'navigate').and.resolveTo();

      component.onLogout().then(() => {
        expect(signOutSpy).toHaveBeenCalled();
        expect(navSpy).toHaveBeenCalledWith(['/login']);
        done();
      });
    });
  });

  describe('editProfile', () => {
    it('should revalidate credentials and open dialog when logged in', done => {
      const mockRevalidRef = {
        afterClosed: () => of(true),
      } as MatDialogRef<RevalidateCredentialsDialogComponent>;

      const mockEditRef = {
        afterClosed: () => of(),
      } as MatDialogRef<ProfileEditDialogComponent>;

      const mockSnackbarRef = {
        afterDismissed: () => of(),
      } as MatSnackBarRef<any>;

      const dialogOpenSpy = spyOn(mockDialog, 'open').and.returnValues(mockRevalidRef, mockEditRef);
      const snackbarSpy = spyOn(mockSnackbar, 'open').and.returnValue(mockSnackbarRef);

      component.editProfile().then(() => {
        expect(dialogOpenSpy).toHaveBeenCalledTimes(2);
        expect(snackbarSpy).toHaveBeenCalledWith('Successfully updated profile', 'CLOSE');
        done();
      });
    });

    it('should revalidate credentials and not open dialog when not logged in', done => {
      const mockRevalidRef = {
        afterClosed: () => of(false),
      } as MatDialogRef<RevalidateCredentialsDialogComponent>;

      const mockSnackbarRef = {
        afterDismissed: () => of(),
      } as MatSnackBarRef<any>;

      const dialogOpenSpy = spyOn(mockDialog, 'open').and.returnValue(mockRevalidRef);
      const snackbarSpy = spyOn(mockSnackbar, 'open').and.returnValue(mockSnackbarRef);

      component.editProfile().then(() => {
        expect(dialogOpenSpy).toHaveBeenCalled();
        expect(snackbarSpy).toHaveBeenCalledWith('Credential revalidation failed. Cannot modify profile', 'CLOSE');
        done();
      });
    });
  });

  describe('deleteProfile', () => {
    it('should revalidate credentials and delete profile when logged in and yes selected', done => {
      const mockRevalidRef = {
        afterClosed: () => of(true),
      } as MatDialogRef<RevalidateCredentialsDialogComponent>;

      const mockDeleteRef = {
        afterClosed: () => of(true),
      } as MatDialogRef<any>;

      const mockSnackbarRef = {
        afterDismissed: () => of(),
      } as MatSnackBarRef<any>;

      const dialogOpenSpy = spyOn(mockDialog, 'open').and.returnValues(mockRevalidRef, mockDeleteRef);
      const routerSpy = spyOn(mockRouter, 'navigateByUrl').and.resolveTo();
      const snackbarSpy = spyOn(mockSnackbar, 'open').and.returnValue(mockSnackbarRef);

      component.deleteProfile().then(() => {
        expect(dialogOpenSpy).toHaveBeenCalledTimes(2);
        expect(routerSpy).toHaveBeenCalledWith('/login');
        expect(snackbarSpy).toHaveBeenCalledWith('Successfully deleted profile', 'CLOSE');
        done();
      });
    });

    it('should revalidate credentials and not delete profile when not logged in', done => {
      const mockRevalidRef = {
        afterClosed: () => of(false),
      } as MatDialogRef<RevalidateCredentialsDialogComponent>;

      const mockSnackbarRef = {
        afterDismissed: () => of(),
      } as MatSnackBarRef<any>;

      const dialogOpenSpy = spyOn(mockDialog, 'open').and.returnValue(mockRevalidRef);
      const snackbarSpy = spyOn(mockSnackbar, 'open').and.returnValue(mockSnackbarRef);

      component.deleteProfile().then(() => {
        expect(dialogOpenSpy).toHaveBeenCalled();
        expect(snackbarSpy).toHaveBeenCalledWith('Credential revalidation failed. Cannot modify profile', 'CLOSE');
        done();
      });
    });
  });

  it('should revalidate credentials and not delete profile when logged in and no selected', done => {
    const mockRevalidRef = {
      afterClosed: () => of(true),
    } as MatDialogRef<RevalidateCredentialsDialogComponent>;

    const mockDeleteRef = {
      afterClosed: () => of(false),
    } as MatDialogRef<any>;

    const mockSnackbarRef = {
      afterDismissed: () => of(),
    } as MatSnackBarRef<any>;

    const dialogOpenSpy = spyOn(mockDialog, 'open').and.returnValues(mockRevalidRef, mockDeleteRef);
    const routerSpy = spyOn(mockRouter, 'navigateByUrl').and.resolveTo();
    const snackbarSpy = spyOn(mockSnackbar, 'open').and.returnValue(mockSnackbarRef);

    component.deleteProfile().then(() => {
      expect(dialogOpenSpy).toHaveBeenCalledTimes(2);
      expect(routerSpy).not.toHaveBeenCalled();
      expect(snackbarSpy).not.toHaveBeenCalled();
      done();
    });
  });
});
