import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileButtonComponent } from './profile-button.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component';
import { ProfileViewComponent } from '../profile-view/profile-view.component';

describe('ProfileButtonComponent', () => {
  let component: ProfileButtonComponent;
  let fixture: ComponentFixture<ProfileButtonComponent>;
  let mockAuth: jasmine.SpyObj<AuthService>;
  let spyRouter: Router;
  let mockUser = {
    uid: '1234',
    photoURL: 'http://helloworld.com/photo',
  };

  beforeEach(async(() => {
    mockAuth = jasmine.createSpyObj(['user', 'isAuthenticated', 'signOut']);
    let mockUserCast = (mockUser as unknown) as User; // a method of getting rid of all the things I don't want
    mockAuth.user.and.returnValue(of(mockUserCast));
    mockAuth.isAuthenticated.and.returnValue(of(true));
    mockAuth.signOut.and.resolveTo();

    TestBed.configureTestingModule({
      declarations: [ ProfileButtonComponent ],
      providers: [
        { provide: AuthService, useValue: mockAuth },
      ],
      imports: [
        OverlayModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginPageComponent },
          { path: 'profile', component: ProfileViewComponent },
        ])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileButtonComponent);
    component = fixture.componentInstance;
    spyRouter = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('togglePopup', () => {
    it('should call this#hidePopup if isShowing', () => {
      spyOn(component, 'hidePopup');
      component['popupIsShowing'] = true;

      component.togglePopup();
      expect(component.hidePopup).toHaveBeenCalled();
    });

    it('should call this#showPopup if not isShowing', () => {
      spyOn(component, 'showPopup');
      component['popupIsShowing'] = false;

      component.togglePopup();
      expect(component.showPopup).toHaveBeenCalled();
    });
  });

  describe('showPopup', () => {
    it('should create overlayRef', () => {
      component.showPopup();
      expect(component['overlayRef']).toBeTruthy();
    });

    xit('should attach template portal to overlay ref', () => {
      component.showPopup(); // call show again to verify that the method was called
      //! Overlay ref has not been set yet. That has to be done for this test to work
      expect(component['overlayRef'].attach).toHaveBeenCalled();
    });

    it('should set popupIsShowing to true', () => {
      component.showPopup();
      expect(component['popupIsShowing']).toBeTrue();
    });
  });

  describe('hidePopup', () => {
    it('should call overlayRef#dispose', () => {
      component.showPopup(); // to init ref
      spyOn(component['overlayRef'], 'dispose');
      component.hidePopup();
      expect(component['overlayRef'].dispose).toHaveBeenCalled();
    });

    it ('should set popupIsShowing to false', () => {
      component.showPopup(); // This is to init ref
      component.hidePopup();
      expect(component['popupIsShowing']).toBeFalse();
    });
  });

  describe('handleLogout', () => {

    it ('should close ref', done => {
      component.showPopup();
      spyOn(component['overlayRef'], 'dispose');

      component.handleLogout().then(() => {
        expect(component['overlayRef'].dispose).toHaveBeenCalled();
        done();
      });
    });

    // TODO router is unknown
    it('should call authService#signOut then navigate', done => {
      component.showPopup();
      spyOn(component['overlayRef'], 'dispose');
      const navSpy = spyOn(spyRouter, 'navigate');
      component.handleLogout().then(() => {
        expect(component['authService'].signOut).toHaveBeenCalled();
        expect(navSpy).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('handleProfile', () => {

    it ('should close ref', done => {
      component.showPopup();
      spyOn(component['overlayRef'], 'dispose');

      component.handleProfile().then(() => {
        expect(component['overlayRef'].dispose).toHaveBeenCalled();
        done();
      });
    });

    // TODO router is unknown
    it('should navigate', done => {
      component.showPopup();
      spyOn(component['overlayRef'], 'dispose');
      const navSpy = spyOn(spyRouter, 'navigate');

      component.handleProfile().then(() => {
        expect(navSpy).toHaveBeenCalled();
        done();
      });
    });
  });
});
