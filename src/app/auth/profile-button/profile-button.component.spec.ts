import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileButtonComponent } from './profile-button.component';
import {FIREBASE_OPTIONS} from '@angular/fire';
import {OverlayModule} from '@angular/cdk/overlay';
import {RouterTestingModule} from '@angular/router/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../../state/state';

describe('ProfileButtonComponent', () => {
  let component: ProfileButtonComponent;
  let fixture: ComponentFixture<ProfileButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileButtonComponent ],
      imports: [
        OverlayModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: FIREBASE_OPTIONS, useValue: {} },
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
