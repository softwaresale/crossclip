import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileViewComponent } from './profile-view.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../../state/state';
import {FIREBASE_OPTIONS} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {RouterTestingModule} from '@angular/router/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MemoizedSelector} from '@ngrx/store';
import {AppState} from '../../state/app-state/app-state.reducer';
import {appStateSelectAnySmall} from '../../state/app-state/app-state.selectors';
import {User} from 'firebase';
import {of} from 'rxjs';

describe('ProfileViewComponent', () => {
  let component: ProfileViewComponent;
  let fixture: ComponentFixture<ProfileViewComponent>;
  let mockStore: MockStore;
  let mockAnySmallBreakpoint: MemoizedSelector<AppState, boolean>;
  const mockUser: User = {
    displayName: 'Test User',
    providerData: [
      { providerId: 'password' }
    ]
  } as User;

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
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    mockAnySmallBreakpoint = mockStore.overrideSelector(appStateSelectAnySmall, false);

    fixture = TestBed.createComponent(ProfileViewComponent);
    component = fixture.componentInstance;
    component.user$ = of(mockUser); // Set the mock user
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
