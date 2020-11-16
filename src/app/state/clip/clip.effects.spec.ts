import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ClipEffects } from './clip.effects';
import {provideMockStore} from '@ngrx/store/testing';
import {FIREBASE_OPTIONS} from '@angular/fire';
import {environment} from '../../../environments/environment';

describe('ClipEffects', () => {
  let actions$: Observable<any>;
  let effects: ClipEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClipEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
        { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
      ]
    });

    effects = TestBed.inject(ClipEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
