import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileButtonComponent } from './profile-button.component';

describe('ProfileButtonComponent', () => {
  let component: ProfileButtonComponent;
  let fixture: ComponentFixture<ProfileButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileButtonComponent ]
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
