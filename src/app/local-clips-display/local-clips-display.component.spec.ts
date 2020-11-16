import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocalClipsDisplayComponent } from './local-clips-display.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {MemoizedSelector} from '@ngrx/store';
import {ClipState} from '../state/clip/clip.reducer';
import {Clip} from '../state/clip/clip.model';
import {clipsSelectAll} from '../state/clip/clip.selectors';

describe('LocalClipsDisplayComponent', () => {
  let component: LocalClipsDisplayComponent;
  let fixture: ComponentFixture<LocalClipsDisplayComponent>;
  let mockStore: MockStore;
  let mockSelectAllClips: MemoizedSelector<ClipState, Clip[]>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalClipsDisplayComponent ],
      providers: [
        provideMockStore(),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    mockSelectAllClips = mockStore.overrideSelector(clipsSelectAll, []);

    fixture = TestBed.createComponent(LocalClipsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
