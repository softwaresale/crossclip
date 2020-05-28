import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileViewComponent } from './profile-view.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from 'src/app/state/state';

describe('ProfileViewComponent', () => {
  let component: ProfileViewComponent;
  let fixture: ComponentFixture<ProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileViewComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
