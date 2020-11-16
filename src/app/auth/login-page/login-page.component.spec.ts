import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../../state/state';
import { FIREBASE_OPTIONS} from '@angular/fire';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MemoizedSelector} from '@ngrx/store';
import {AppState} from '../../state/app-state/app-state.reducer';
import {appStateSelectAnySmall} from '../../state/app-state/app-state.selectors';
import {environment} from '../../../environments/environment';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let mockStore: MockStore;
  let mockAnySmallBreakpoint: MemoizedSelector<AppState, boolean>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        MatSnackBarModule,
        // AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    mockAnySmallBreakpoint = mockStore.overrideSelector(appStateSelectAnySmall, false);

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
