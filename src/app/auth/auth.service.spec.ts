import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { of } from 'rxjs';
import { FIREBASE_OPTIONS } from '@angular/fire';

describe('AuthService', () => {
  let service: AuthService;
  // let mockAuth: jasmine.SpyObj<AngularFireAuth>;
  let mockUser = {
    uid: '1234'
  };
  let mockAuthStub = {
    signOut: (): Promise<void> => Promise.resolve(),
    authState: of(mockUser),
  };

  beforeEach(() => {
    const mockUserCast = (mockUser as unknown) as User;
    // mockAuth = jasmine.createSpyObj(['signOut'], ['authState']);
    // spyOnProperty(mockAuth, 'authState', 'get').and.returnValue(of(mockUserCast));
    // mockAuth.signOut.and.resolveTo();

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
});
