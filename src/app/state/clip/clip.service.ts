import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Clip } from './clip.model';
import { from, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
  ) { }

  syncClip(clip: Clip): Observable<Clip> {
    const newDoc = this.firestore.collection('clips').doc<Clip>(clip.id);
    // Set the synced flag
    /*
    TODO might have to change this because the SSOT is the cloud, so the synced state should
    reflect that.
     */

    // Save the clip
    return this.auth.user.pipe(
      // Only take one. No need to take a lot
      take(1),
      // Map user into updated clip value
      map(user => ({ ...clip, synced: true, uid: user.uid })),
      // actually upload the clipping
      switchMap(updatedValue => from(newDoc.set(updatedValue)).pipe(
        switchMap(() => from(newDoc.get()).pipe(
          map(value => value.data() as Clip)
        ))
      ))
    );
  }

  setClipComment(clip: Clip, comment: string): Observable<Clip> {
    const clipDoc = this.firestore.collection('clips').doc<Clip>(clip.id);
    return from(clipDoc.update({comment})).pipe(
      switchMap(() => clipDoc.get().pipe(
        map(info => info.data() as Clip)
      ))
    );
  }

  deleteRemoteClip(clip: Clip): Observable<string> {
    const clipRef = this.firestore.collection<Clip>('clips').doc(clip.id);
    return from(clipRef.delete()).pipe(
      map(() => clip.id)
    );
  }
}
