import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileButtonComponent } from './profile-button.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from 'firebase';

describe('ProfileButtonComponent', () => {
  let component: ProfileButtonComponent;
  let fixture: ComponentFixture<ProfileButtonComponent>;
  let mockAuth: jasmine.SpyObj<AuthService>;
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
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
