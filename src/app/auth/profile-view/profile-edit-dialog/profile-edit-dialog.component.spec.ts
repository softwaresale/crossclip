import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileEditDialogComponent } from './profile-edit-dialog.component';
import {MatDialogRef} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {FIREBASE_OPTIONS} from '@angular/fire';
import {environment} from '../../../../environments/environment';
import { User } from 'firebase';
import {of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

describe('ProfileEditDialogComponent', () => {
  let component: ProfileEditDialogComponent;
  let fixture: ComponentFixture<ProfileEditDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ProfileEditDialogComponent>>;
  const mockUser: User = {
    displayName: 'Test User',
    providerData: [
      { providerId: 'password' }
    ],
    photoURL: 'photourl',
  } as User;
  const mockFireAuth = {
    user: of(mockUser),
  };

  beforeEach(waitForAsync(() => {
    mockDialogRef = jasmine.createSpyObj(['close']);

    TestBed.configureTestingModule({
      declarations: [ ProfileEditDialogComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
        { provide: AngularFireAuth, useValue: mockFireAuth },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
