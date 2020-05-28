import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ClipActions from './clip.actions';
import { addClip, deleteClip, updateClip } from './clip.actions';
import { map, switchMap, withLatestFrom, catchError } from 'rxjs/operators';
import { ClipService } from './clip.service';
import { Clip } from './clip.model';
import { firestore } from 'firebase';
import { v4 } from 'uuid';
import { Update } from '@ngrx/entity';
import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from '../state';
import { clipsSelectAll } from './clip.selectors';
import { errorNetwork } from '../error/app-error.actions';

@Injectable()
export class ClipEffects {

  clipboardChanged$ = createEffect(() => this.actions$.pipe(
    ofType(ClipActions.clipboardChanged),
    withLatestFrom(this.store$.pipe(select(clipsSelectAll))),
    map( ([action, clips]) => {
      if (clips.some(clip => clip.content === action.text)) {
        // Content is already in the clipboard. Either update the timestamp, or do nothing
        const existingClip = clips.find(clip => clip.content === action.text);
        const updatedTimestamp: Clip = { ...existingClip, created: firestore.Timestamp.now() }
        return updateClip({ clip: { id: existingClip.id, changes: updatedTimestamp } });
      } else {
        const newClip: Clip = {
          id: v4(),
          content: action.text,
          clipType: 'text/plain',
          created: firestore.Timestamp.now(),
          synced: false,
        };

        return addClip({ clip: newClip });
      }
    })
  ));

  syncClip$ = createEffect(() => this.actions$.pipe(
    ofType(ClipActions.syncClip),
    switchMap(action => this.clipService.syncClip(action.clip).pipe(
      map(syncedClip => {
        const clipUpdate: Update<Clip> = {
          id: syncedClip.id,
          changes: syncedClip
        };

        return updateClip({ clip: clipUpdate });
      }),
      catchError(err => of(errorNetwork({ causingComponent: 'clips effect', content: err }))),
    ))
  ));

  handleRemoveClip$ = createEffect(() => this.actions$.pipe(
    ofType(ClipActions.handleRemoveClip),
    switchMap(action => {
      if (action.clip.synced && action.deleteRemote) {
        // If clip is synced with cloud, it needs to be deleted there too
        // Has to be told to do so though
        return this.clipService.deleteRemoteClip(action.clip).pipe(
          map(id => deleteClip({ id })),
          catchError(err => of(errorNetwork({ causingComponent: 'clips effect', content: err }))),
        );
      } else {
        // Just remove it from the state
        return of(deleteClip({ id: action.clip.id }));
      }
    })
  ));

  constructor(
    private actions$: Actions,
    private store$: Store<State>,
    private clipService: ClipService
  ) {}

}
