import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Clip } from "./clip.model";
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  async createClipFromText(text: string) {
    const newDoc = this.firestore.collection('clips').doc();
    const newClip: Clip = {
      content: text,
      created: firestore.Timestamp.now(),
      clipType: 'text/plain', // TODO find a mimetype library
    };

    // Save the clip
    await newDoc.set(newClip);

    return newDoc;
  }
}
