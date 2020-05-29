import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileViewComponent } from './profile-view.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialState } from 'src/app/state/state';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { MemoizedSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app-state/app-state.reducer';
import { appStateSelectAnySmall } from 'src/app/state/app-state/app-state.selectors';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component';

describe('ProfileViewComponent', () => {
  let component: ProfileViewComponent;
  let fixture: ComponentFixture<ProfileViewComponent>;
  let spyAuth: jasmine.SpyObj<AuthService>;
  let mockCredentials: auth.UserCredential;
  let mockStore: MockStore;
  let spyRouter: Router;
  let mockSelectAnySmall: MemoizedSelector<AppState, boolean>;

  beforeEach(async(() => {
    mockCredentials = {
      user: null,
      credential: null,
    };

    spyAuth = jasmine.createSpyObj(['signOut', 'user']);
    spyAuth.signOut.and.resolveTo();

    TestBed.configureTestingModule({
      declarations: [ ProfileViewComponent ],
      providers: [
        provideMockStore({ initialState }),
        { provide: AuthService, useValue: spyAuth },
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginPageComponent }
        ]),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileViewComponent);
    component = fixture.componentInstance;

    mockStore = TestBed.inject(MockStore);
    mockSelectAnySmall = mockStore.overrideSelector(
      appStateSelectAnySmall,
      true
    );

    spyRouter = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onLogout', () => {
    it('should call authService#signOut then navigate', done => {
      const navSpy = spyOn(spyRouter, 'navigate');
      component.onLogout().then(() => {
        expect(spyAuth.signOut).toHaveBeenCalled();
        expect(navSpy).toHaveBeenCalled();
        done();
      });
    });
  });
});
