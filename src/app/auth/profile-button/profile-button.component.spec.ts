import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileButtonComponent } from './profile-button.component';
import {FIREBASE_OPTIONS} from '@angular/fire';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import {RouterTestingModule} from '@angular/router/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../../state/state';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Router } from '@angular/router';

describe('ProfileButtonComponent', () => {
  let component: ProfileButtonComponent;
  let fixture: ComponentFixture<ProfileButtonComponent>;
  const mockAuth = {
    authState: of({
      reload: () => Promise.resolve(),
    }),
    currentUser: Promise.resolve({ uid: 'asdf', displayName: 'test' }),
    user: of({
      uid: 'asdf',
      reload: () => Promise.resolve(),
      displayName: 'test',
    }),
    signOut: () => Promise.resolve(),
  };
  let mockAngularAuth: AngularFireAuth;
  let mockOverlay: Overlay;
  let mockRouter: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileButtonComponent ],
      imports: [
        OverlayModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: FIREBASE_OPTIONS, useValue: {} },
        { provide: AngularFireAuth, useValue: mockAuth },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockOverlay = TestBed.inject(Overlay);
    mockAngularAuth = TestBed.inject(AngularFireAuth);
    mockRouter = TestBed.inject(Router);

    fixture = TestBed.createComponent(ProfileButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('showPopup', () => {
    beforeEach(() => {
      component.user$.next({ displayName: 'test' } as User);
    });

    it('should show popup', () => {
      const refSpy = jasmine.createSpyObj(['attach']);
      const createSpy = spyOn(mockOverlay, 'create').and.returnValue(refSpy);

      component.showPopup();

      expect(createSpy).toHaveBeenCalled();
      expect(refSpy.attach).toHaveBeenCalled();
    });
  });

  describe('handleLogout', () => {
    beforeEach(() => {
      component.user$.next({ displayName: 'test' } as User);
    });

    it('should sign out properly', done => {
      // Need to be showing popup to work properly
      component.showPopup();
      const signOutSpy = spyOn(mockAngularAuth, 'signOut').and.resolveTo();
      const navSpy = spyOn(mockRouter, 'navigate').and.resolveTo();

      component.handleLogout().then(() => {
        expect(signOutSpy).toHaveBeenCalled();
        expect(navSpy).toHaveBeenCalledWith(['/login']);
        done();
      });
    });
  });

  describe('handleProfile', () => {
    beforeEach(() => {
      component.user$.next({ displayName: 'test' } as User);
    });

    it('should navigate to profile', done => {
      // Need to be showing popup to work properly
      component.showPopup();
      const navSpy = spyOn(mockRouter, 'navigate').and.resolveTo();
      component.handleProfile().then(() => {
        expect(navSpy).toHaveBeenCalledWith(['/profile']);
        done();
      });
    });
  });
});
