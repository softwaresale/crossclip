import { Component, OnInit } from '@angular/core';
import { Clip } from '../state/clip/clip.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-remote-clips-display',
  templateUrl: './remote-clips-display.component.html',
  styleUrls: ['./remote-clips-display.component.sass']
})
export class RemoteClipsDisplayComponent implements OnInit {

  clips$: BehaviorSubject<Clip[]>;

  constructor() { }

  ngOnInit(): void {
    this.clips$ = new BehaviorSubject<Clip[]>([]);
  }

}
