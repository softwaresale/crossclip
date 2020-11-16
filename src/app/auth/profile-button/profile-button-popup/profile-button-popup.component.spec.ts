import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileButtonPopupComponent } from './profile-button-popup.component';
import {PROFILE_BUTTON_CALLBACKS, PROFILE_BUTTON_DISPLAY_NAME} from '../profile-button.component';

describe('ProfileButtonPopupComponent', () => {
  let component: ProfileButtonPopupComponent;
  let fixture: ComponentFixture<ProfileButtonPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileButtonPopupComponent ],
      providers: [
        { provide: PROFILE_BUTTON_DISPLAY_NAME, useValue: 'test user' },
        { provide: PROFILE_BUTTON_CALLBACKS, useValue: { onProfile: () => {}, onLogout: () => {} } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileButtonPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
