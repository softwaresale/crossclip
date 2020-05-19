import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileButtonPopupComponent } from './profile-button-popup.component';

describe('ProfileButtonPopupComponent', () => {
  let component: ProfileButtonPopupComponent;
  let fixture: ComponentFixture<ProfileButtonPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileButtonPopupComponent ]
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
