import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileButtonComponent } from './profile-button.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';

describe('ProfileButtonComponent', () => {
  let component: ProfileButtonComponent;
  let fixture: ComponentFixture<ProfileButtonComponent>;
  let mockAuth: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(async(() => {
    mockAuth = jasmine.createSpyObj(['signOut'], ['authState', 'user']);
    mockAuth.signOut.and.resolveTo();
    spyOnProperty(mockAuth, 'authState').and.returnValue(of({}));
    spyOnProperty(mockAuth, 'user').and.returnValue(of({}));

    TestBed.configureTestingModule({
      declarations: [ ProfileButtonComponent ],
      providers: [
        { provide: AngularFireAuth, useValue: mockAuth },
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
