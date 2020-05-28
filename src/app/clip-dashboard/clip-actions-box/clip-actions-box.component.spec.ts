import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipActionsBoxComponent } from './clip-actions-box.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialState } from 'src/app/state/state';
import { MemoizedSelector, Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app-state/app-state.reducer';
import { appStateSelectAnySmall } from 'src/app/state/app-state/app-state.selectors';

describe('ClipActionsBoxComponent', () => {
  let component: ClipActionsBoxComponent;
  let fixture: ComponentFixture<ClipActionsBoxComponent>;
  let mockStore: MockStore;
  let mockSelectAnySmall: MemoizedSelector<AppState, boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipActionsBoxComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipActionsBoxComponent);
    component = fixture.componentInstance;

    // TODO will probably want to put this in each state
    mockStore = TestBed.inject(MockStore);
    mockSelectAnySmall = mockStore.overrideSelector(
      appStateSelectAnySmall,
      true
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
