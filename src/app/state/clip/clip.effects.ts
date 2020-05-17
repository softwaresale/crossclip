import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ClipActions from "./clip.actions";
import { map, switchMap } from "rxjs/operators";
import { ClipService } from "./clip.service";
import { addClip, clipError } from "./clip.actions";
import { Clip } from "./clip.model";
import { firestore } from 'firebase';
import { v1 } from 'uuid';

@Injectable()
export class ClipEffects {

  clipboardChanged$ = createEffect(() => this.actions$.pipe(
    ofType(ClipActions.clipboardChanged),
    switchMap(async action => {
      /*
      const newDocRef = await this.clipService.createClipFromText(action.text);
      const snapshot = await newDocRef.get().toPromise();
      if (snapshot.exists) {
        const docData = snapshot.data() as Clip;
        docData.id = snapshot.id;
        return addClip({ clip: docData });
      } else {
        // TODO handle error
        return clipError();
      }
       */
      const newClip: Clip = {
        id: v1(),
        content: action.text,
        clipType: 'text/plain',
        created: firestore.Timestamp.now(),
      };

      return addClip({ clip: newClip });
    })
  ));

  constructor(
    private actions$: Actions,
    private clipService: ClipService
  ) {}

}
