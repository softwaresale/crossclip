import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { initialState } from './state/state';
import { provideMockStore } from '@ngrx/store/testing'
import { AuthService } from './auth/auth.service';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConnectionServiceModule } from 'ng-connection-service';

describe('AppComponent', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockSW: jasmine.SpyObj<SwUpdate>;

  beforeEach(async(() => {
    mockAuthService = jasmine.createSpyObj(['isAuthenticated']);
    mockSW = jasmine.createSpyObj(['activateUpdate'], ['available', 'activated']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        ConnectionServiceModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: AuthService, useValue: mockAuthService },
        { provide: SwUpdate, useValue: mockSW },
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });
});
