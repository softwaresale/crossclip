import { Component, OnInit } from '@angular/core';
import { State } from "../state/state";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Clip } from "../state/clip/clip.model";
import { clipsSelectAll } from "../state/clip/clip.selectors";

@Component({
  selector: 'app-local-clips-display',
  templateUrl: './local-clips-display.component.html',
  styleUrls: ['./local-clips-display.component.sass']
})
export class LocalClipsDisplayComponent implements OnInit {

  clips$: Observable<Clip[]>;

  constructor(private store$: Store<State>) { }

  ngOnInit(): void {
    this.clips$ = this.store$.pipe(select(clipsSelectAll));
  }

}
