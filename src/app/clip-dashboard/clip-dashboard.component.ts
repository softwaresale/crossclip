import { Component, Input, OnInit } from '@angular/core';
import { Clip } from '../state/clip/clip.model';

@Component({
  selector: 'app-clip-dashboard',
  templateUrl: './clip-dashboard.component.html',
  styleUrls: ['./clip-dashboard.component.sass']
})
export class ClipDashboardComponent implements OnInit {

  @Input()
  clips: Clip[];

  @Input()
  emptyDescription: string;

  get clipsEmpty(): boolean { return (this.clips?.length ?? 0) === 0 }

  constructor() { }

  ngOnInit(): void {
  }

}
