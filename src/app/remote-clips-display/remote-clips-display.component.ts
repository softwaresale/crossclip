import { Component, OnInit } from '@angular/core';
import { Clip } from '../state/clip/clip.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-remote-clips-display',
  templateUrl: './remote-clips-display.component.html',
  styleUrls: ['./remote-clips-display.component.sass']
})
export class RemoteClipsDisplayComponent implements OnInit {

  clips$: Observable<Clip[]>;

  constructor(
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    // this.clips$ = new BehaviorSubject<Clip[]>([]);
    this.clips$ = this.firestore.collection<Clip>('clips').valueChanges();
    // this.firestore.collection<Clip>('clips').snapshotChanges()
  }

}
