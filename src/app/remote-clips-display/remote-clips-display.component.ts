import { Component, OnInit } from '@angular/core';
import { Clip } from '../state/clip/clip.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-remote-clips-display',
  templateUrl: './remote-clips-display.component.html',
  styleUrls: ['./remote-clips-display.component.sass']
})
export class RemoteClipsDisplayComponent implements OnInit {

  clips$: Observable<Clip[]>;
  emptyMsg = "Sync some clippings from 'Local' and they'll show up here";

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.clips$ = this.authService.user().pipe(
      switchMap(user =>
        this.firestore.collection<Clip>('clips', ref => ref.where('uid', '==', user.uid)).valueChanges()
      )
    );
  }

}
