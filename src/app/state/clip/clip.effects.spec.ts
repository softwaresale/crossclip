import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ClipEffects } from './clip.effects';

describe('ClipEffects', () => {
  let actions$: Observable<any>;
  let effects: ClipEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClipEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ClipEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
