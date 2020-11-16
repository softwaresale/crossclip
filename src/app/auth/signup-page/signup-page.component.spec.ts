import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SignupPageComponent } from './signup-page.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../../state/state';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {FIREBASE_OPTIONS} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {appStateSelectAnySmall} from '../../state/app-state/app-state.selectors';
import {MemoizedSelector} from '@ngrx/store';
import {AppState} from '../../state/app-state/app-state.reducer';

describe('SignupPageComponent', () => {
  let component: SignupPageComponent;
  let fixture: ComponentFixture<SignupPageComponent>;
  let mockStore: MockStore;
  let mockAnySmallBreakpoint: MemoizedSelector<AppState, boolean>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupPageComponent ],
      imports: [
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        MatSnackBarModule,
        MatIconModule,
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

    fixture = TestBed.createComponent(SignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
