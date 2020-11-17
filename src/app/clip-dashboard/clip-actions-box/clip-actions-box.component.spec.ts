import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClipActionsBoxComponent } from './clip-actions-box.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../../state/state';
import {MemoizedSelector} from '@ngrx/store';
import {AppState} from '../../state/app-state/app-state.reducer';
import {appStateSelectSizeSmall, appStateSelectSizeXSmall} from '../../state/app-state/app-state.selectors';
import {MatMenuModule} from '@angular/material/menu';

describe('ClipActionsBoxComponent', () => {
  let component: ClipActionsBoxComponent;
  let fixture: ComponentFixture<ClipActionsBoxComponent>;
  let mockStore: MockStore;
  let mockSmallBreakpoint: MemoizedSelector<AppState, boolean>;
  let mockXSmallBreakpoint: MemoizedSelector<AppState, boolean>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipActionsBoxComponent ],
      imports: [
        MatMenuModule,
      ],
      providers: [
        provideMockStore({
          initialState,
        }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    mockSmallBreakpoint = mockStore.overrideSelector(appStateSelectSizeSmall, true);
    mockXSmallBreakpoint = mockStore.overrideSelector(appStateSelectSizeXSmall, false);

    fixture = TestBed.createComponent(ClipActionsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
