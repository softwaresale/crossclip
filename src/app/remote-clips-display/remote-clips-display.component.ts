import { Component, OnInit } from '@angular/core';
import { Clip } from '../state/clip/clip.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-remote-clips-display',
  templateUrl: './remote-clips-display.component.html',
  styleUrls: ['./remote-clips-display.component.sass']
})
export class RemoteClipsDisplayComponent implements OnInit {

  clips$: Observable<Clip[]>;

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
  ) { }

  ngOnInit(): void {
    this.clips$ = this.auth.user.pipe(
      switchMap(user =>
        this.firestore.collection<Clip>('clips', ref => ref.where('uid', '==', user.uid)).valueChanges()
      )
    );
  }

}
