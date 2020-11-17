import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from './state/state';
import {AngularFireModule, FIREBASE_OPTIONS} from '@angular/fire';
import {of} from 'rxjs';
import {SwUpdate} from '@angular/service-worker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';

describe('AppComponent', () => {
  const mockSWUpdate = {
    available: of(true),
    activated: of(true),
    activateUpdate: () => Promise.resolve(),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatSnackBarModule,
        NoopAnimationsModule,
        // AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
        { provide: SwUpdate, useValue: mockSWUpdate },
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
