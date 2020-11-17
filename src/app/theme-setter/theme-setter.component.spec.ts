import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThemeSetterComponent } from './theme-setter.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../state/state';

describe('ThemeSetterComponent', () => {
  let component: ThemeSetterComponent;
  let fixture: ComponentFixture<ThemeSetterComponent>;
  let mockStore: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeSetterComponent ],
      providers: [
        provideMockStore({
          initialState,
        }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockStore = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
