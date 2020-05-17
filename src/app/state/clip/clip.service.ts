import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Clip } from "./clip.model";
import { firestore } from 'firebase';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  syncClip(clip: Clip): Observable<Clip> {
    const newDoc = this.firestore.collection('clips').doc<Clip>(clip.id);
    // Set the synced flag
    /*
    TODO might have to change this because the SSOT is the cloud, so the synced state should
    reflect that.
     */
    const updatedValue: Clip = { ...clip, synced: true };
    clip.synced = true;
    // Save the clip
    return from(newDoc.set(updatedValue)).pipe(
      switchMap(() => from(newDoc.get()).pipe(
        map(value => value.data() as Clip)
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
