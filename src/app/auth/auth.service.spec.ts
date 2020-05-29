import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { of } from 'rxjs';
import { FIREBASE_OPTIONS } from '@angular/fire';

describe('AuthService', () => {
  let service: AuthService;
  let mockUser = {
    uid: '1234'
  };
  let mockAuthStub = {
    signOut: (): Promise<void> => Promise.resolve(),
    authState: of(mockUser),
  };

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: {} },
        { provide: AngularFireAuth, useValue: mockAuthStub }
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isAuthenticated', () => {
    it('should return true with truthy authState', done => {
      service.isAuthenticated().subscribe(isAuthenticated => {
        expect(isAuthenticated).toBeTrue();
        done();
      });
    });

    it('should return false with falsy authState', done => {
      mockAuthStub.authState = of(null);
      // spyOnProperty(mockAuthStub, 'authState', 'get').and.returnValue(of(null));
      
      service.isAuthenticated().subscribe(isAuthenticated => {
        expect(isAuthenticated).toBeFalse();
        done();
      });

    });
  });

  describe('user', () => {
    it('should return truthy value', done => {
      service.user().subscribe(authState => {
        expect(authState).toBeTruthy();
        done();
      });
    });
  });

  describe('signOut', () => {
    it('should call angularFireAuth#signOut', done => {
      spyOn(mockAuthStub, 'signOut').and.callThrough();

      service.signOut().then(() => {
        expect(mockAuthStub.signOut).toHaveBeenCalled();
        done();
      });
    });
  });
});
