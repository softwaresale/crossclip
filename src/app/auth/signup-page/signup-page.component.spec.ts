import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPageComponent } from './signup-page.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'src/app/state/state';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

describe('SignupPageComponent', () => {
  let component: SignupPageComponent;
  let fixture: ComponentFixture<SignupPageComponent>;
  let authSpy: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(async(() => {
    authSpy = jasmine.createSpyObj(['createUserWithEmailAndPassword']);

    TestBed.configureTestingModule({
      declarations: [ SignupPageComponent ],
      providers: [
        provideMockStore({ initialState }),
        { provide: AngularFireAuth, useValue: authSpy },
        { provide: 'angularfire2.app.options', useValue: {} }
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatSnackBarModule,
        HttpClientModule,
        MatIconModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
