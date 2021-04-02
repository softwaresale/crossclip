import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ClipActions from './clip.actions';
import { addClip, deleteClip, updateClip } from './clip.actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ClipService } from './clip.service';
import { Clip } from './clip.model';
import { firestore } from 'firebase';
import { v4 } from 'uuid';
import { Update } from '@ngrx/entity';
import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from '../state';
import { clipsSelectAll } from './clip.selectors';
import { ContentClassificationService } from '../../content-classifiers/content-classification.service';

@Injectable()
export class ClipEffects {

  clipboardChanged$ = createEffect(() => this.actions$.pipe(
    ofType(ClipActions.clipboardChanged),
    withLatestFrom(this.store$.pipe(select(clipsSelectAll))),
    map( ([action, clips]) => {
      if (clips.some(clip => clip.content === action.text)) {
        // Content is already in the clipboard. Either update the timestamp, or do nothing
        const existingClip = clips.find(clip => clip.content === action.text);
        const updatedTimestamp: Clip = { ...existingClip, created: firestore.Timestamp.now() };
        return updateClip({ clip: { id: existingClip.id, changes: updatedTimestamp } });
      } else {

        // Get the type of the content
        const type = this.contentClassifier.getType(action.text);

        const newClip: Clip = {
          id: v4(),
          content: action.text,
          clipType: type,
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
    ))
  ));

  setClipContent$ = createEffect(() => this.actions$.pipe(
    ofType(ClipActions.addComment),
    switchMap(action => {
      if (action.clip.synced) {
        // Set stuff remotely
        return this.clipService.setClipComment(action.clip, action.comment).pipe(
          map(updatedClip => updateClip({ clip: { id: updatedClip.id, changes: { comment: updatedClip.comment } } }))
        );
      } else {
        // Update the object
        return of(updateClip({ clip: { id: action.clip.id, changes: { comment: action.comment } } }));
      }
    })
  ));

  handleRemoveClip$ = createEffect(() => this.actions$.pipe(
    ofType(ClipActions.handleRemoveClip),
    switchMap(action => {
      if (action.clip.synced && action.deleteRemote) {
        // If clip is synced with cloud, it needs to be deleted there too
        // Has to be told to do so though
        return this.clipService.deleteRemoteClip(action.clip).pipe(
          map(id => deleteClip({ id }))
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
    private clipService: ClipService,
    private contentClassifier: ContentClassificationService,
  ) {}

}
