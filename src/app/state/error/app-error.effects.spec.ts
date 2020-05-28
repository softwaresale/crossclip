import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AppErrorEffects } from './app-error.effects';

describe('AppErrorEffects', () => {
  let actions$: Observable<any>;
  let effects: AppErrorEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppErrorEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(AppErrorEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
