import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ClipEffects } from './clip.effects';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../state';
import { ClipService } from './clip.service';

describe('ClipEffects', () => {
  let actions$: Observable<any>;
  let effects: ClipEffects;
  let mockClipService: jasmine.SpyObj<ClipService>;

  beforeEach(() => {
    mockClipService = jasmine.createSpyObj(['syncClip', 'deleteRemoteClip']);

    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        ClipEffects,
        provideMockActions(() => actions$),
        { provide: ClipService, useValue: mockClipService },
      ]
    });

    effects = TestBed.inject(ClipEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
